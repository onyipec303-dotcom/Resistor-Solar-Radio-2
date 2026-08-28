import React, { useState } from 'react';
import { X, RefreshCw, Download, Search, CheckCircle, AlertTriangle, Phone, MapPin, Clock, Trash2, Calendar, Mail } from 'lucide-react';
import { LeadOrder } from '../types';
import peculiarLogo from '../assets/images/peculiar_stores_logo.png';

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadOrder[];
  onRefresh: () => void;
  onResync: (id: string) => Promise<void>;
  onUpdateStatus: (id: string, status: LeadOrder['status']) => Promise<void>;
  onDeleteLead: (id: string) => Promise<void>;
}

export function AdminLeadsModal({
  isOpen,
  onClose,
  leads,
  onRefresh,
  onResync,
  onUpdateStatus,
  onDeleteLead,
}: AdminLeadsModalProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [resyncingId, setResyncingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(search.toLowerCase())) ||
      lead.phone1.includes(search) ||
      lead.id.toLowerCase().includes(search.toLowerCase()) ||
      lead.address.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = [
      'Order ID',
      'Date',
      'Name',
      'Email',
      'Phone 1',
      'Phone 2',
      'Address',
      'Product',
      'Quantity',
      'Amount',
      'When to Receive',
      'Status',
      'Synced to Sheet',
    ];

    const rows = leads.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleString(),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${l.phone1}"`,
      `"${l.phone2 || ''}"`,
      `"${l.address.replace(/"/g, '""')}"`,
      `"${l.productName}"`,
      `"${l.productQuantity}"`,
      `"${l.amount}"`,
      `"${l.whenToReceive}"`,
      l.status,
      l.syncedToGoogleSheet ? 'Yes' : 'No',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `radio_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResyncClick = async (id: string) => {
    setResyncingId(id);
    await onResync(id);
    setResyncingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white border border-slate-700 p-0.5 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={peculiarLogo}
                alt="Peculiar Stores"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                Peculiar Stores • Leads Management ({leads.length})
              </h2>
              <p className="text-xs text-slate-400">View customer orders, check Google Sheet sync status, and export data</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, phone, address or Order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600">Status:</span>
            {['ALL', 'Pending', 'Contacted', 'Delivered', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No orders found matching your criteria.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-300 shadow-sm transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
                        {lead.id}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(lead.createdAt).toLocaleString()}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                          lead.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : lead.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : lead.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {lead.syncedToGoogleSheet ? (
                        <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          Synced to Google Sheet
                        </span>
                      ) : (
                        <button
                          onClick={() => handleResyncClick(lead.id)}
                          disabled={resyncingId === lead.id}
                          className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded font-medium flex items-center gap-1 transition-colors"
                        >
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          {resyncingId === lead.id ? 'Syncing...' : 'Sync to Sheet'}
                        </button>
                      )}

                      <select
                        value={lead.status}
                        onChange={(e) => onUpdateStatus(lead.id, e.target.value as any)}
                        className="text-xs border border-slate-300 rounded px-2 py-1 bg-white"
                      >
                        <option value="Pending">Mark Pending</option>
                        <option value="Contacted">Mark Contacted</option>
                        <option value="Delivered">Mark Delivered</option>
                        <option value="Cancelled">Mark Cancelled</option>
                      </select>

                      <button
                        onClick={() => onDeleteLead(lead.id)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{lead.name}</p>
                      {lead.email && (
                        <p className="text-slate-600 flex items-center gap-1 mt-0.5 text-[11px]">
                          <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{lead.email}</span>
                        </p>
                      )}
                      <p className="text-slate-600 flex items-center gap-1 mt-1 font-mono">
                        <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                        {lead.phone1} {lead.phone2 ? `/ ${lead.phone2}` : ''}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-slate-700 flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{lead.address}</span>
                      </p>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <p className="font-semibold text-slate-900">{lead.productQuantity} - {lead.amount}</p>
                      <p className="text-slate-500 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Receive: <span className="font-medium text-slate-800">{lead.whenToReceive}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
