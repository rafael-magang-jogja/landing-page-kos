import React, { useState } from 'react';
import {
  Save,
  Download,
  Copy,
  ArrowLeft,
  Check,
  Lock,
  Eye,
  Settings,
  Bed,
  HelpCircle,
  RotateCcw,
  Plus,
  Trash2,
  Upload,
  Image,
} from 'lucide-react';
import { uploadKosImage } from '../lib/supabase';

const ADMIN_PIN = 'admin123'; // Default PIN

export default function AdminDashboard({
  data,
  isSupabaseConnected,
  onSave,
  onReset,
  onBackToLanding,
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('info');
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveAlert, setSaveAlert] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [uploadError, setUploadError] = useState('');

  // Local state copy of kos data
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(data)));

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN salah! PIN default adalah: admin123');
    }
  };

  const handleInfoChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      kosInfo: {
        ...prev.kosInfo,
        [field]: value,
      },
    }));
  };

  const handleRoomChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedRooms = [...prev.roomTypes];
      updatedRooms[index] = {
        ...updatedRooms[index],
        [field]: value,
      };
      return {
        ...prev,
        roomTypes: updatedRooms,
      };
    });
  };

  const handleRoomAvailabilityToggle = (index) => {
    setFormData((prev) => {
      const updatedRooms = [...prev.roomTypes];
      const current = updatedRooms[index].isAvailable;
      updatedRooms[index] = {
        ...updatedRooms[index],
        isAvailable: !current,
        available: !current ? 1 : 0,
      };
      return {
        ...prev,
        roomTypes: updatedRooms,
      };
    });
  };

  // Add new room handler
  const handleAddRoom = () => {
    const newId = `room-${Date.now()}`;
    const newRoom = {
      id: newId,
      name: 'Tipe Kamar Baru',
      tag: 'Kamar Baru',
      size: '3 x 3.5 Meter',
      price: 1500000,
      originalPrice: null,
      period: 'bulan',
      available: 1,
      isAvailable: true,
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      gallery: [],
      description: 'Deskripsi kamar kos yang nyaman dan rapi dengan fasilitas lengkap siap huni.',
      facilities: [
        'AC Dingin Hemat Energi',
        'Kasur Springbed Nyaman',
        'Kamar Mandi Dalam',
        'Lemari Pakaian',
        'Meja Belajar / Kerja + Kursi',
        'Free WiFi High Speed',
      ],
      inclusions: ['Termasuk Air Bersih', 'Termasuk Iuran Sampah', 'Listrik Token Mandiri'],
    };

    setFormData((prev) => ({
      ...prev,
      roomTypes: [newRoom, ...prev.roomTypes],
    }));
  };

  // Delete room handler
  const handleDeleteRoom = (index) => {
    const roomName = formData.roomTypes[index]?.name || 'kamar ini';
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${roomName}"?`)) {
      setFormData((prev) => {
        const updated = [...prev.roomTypes];
        updated.splice(index, 1);
        return {
          ...prev,
          roomTypes: updated,
        };
      });
    }
  };

  // Image upload handler
  const handleImageUpload = async (index, file) => {
    if (!file) return;
    try {
      setUploadingIndex(index);
      setUploadError('');
      const publicUrl = await uploadKosImage(file);
      handleRoomChange(index, 'image', publicUrl);
    } catch (err) {
      console.error('Gagal upload gambar:', err);
      setUploadError(`Gagal upload: ${err.message}. Pastikan bucket 'kos-images' sudah dibuat di Supabase.`);
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSaveToBrowser = async () => {
    setIsSaving(true);
    const res = await onSave(formData);
    setIsSaving(false);

    if (res?.success) {
      setSaveMessage(
        isSupabaseConnected
          ? 'Data berhasil disimpan langsung ke Database Supabase!'
          : 'Data berhasil diterapkan ke browser!'
      );
    } else {
      setSaveMessage('Gagal menyimpan ke Supabase: ' + (res?.error || 'Unknown error'));
    }
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 3500);
  };

  const handleDownloadJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(formData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'kosData.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-5">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Panel Kelola Kos</h2>
          <p className="text-sm text-slate-500 mt-1 mb-6">
            Masukkan PIN pengelola untuk mengedit teks, harga kamar, dan status ketersediaan.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Masukkan PIN (Default: admin123)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-center text-lg tracking-widest focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                autoFocus
              />
              {pinError && <p className="text-xs text-red-500 mt-2 font-medium">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-lg shadow-emerald-600/20"
            >
              Masuk ke Panel Admin
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <button
              onClick={onBackToLanding}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Utama</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20">
      {/* Admin Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              title="Kembali ke Landing Page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Panel Pengelola Kos</h1>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Mode Editor</span>
                <span>•</span>
                {isSupabaseConnected ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Supabase Database Aktif
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    Mode Lokal / JSON
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSaveToBrowser}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : isSupabaseConnected ? 'Simpan ke Supabase' : 'Terapkan Perubahan'}</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all"
              title="Download file kosData.json yang baru untuk ditimpa ke repository"
            >
              <Download className="w-4 h-4" />
              <span>Download JSON</span>
            </button>

            <button
              onClick={handleCopyJSON}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin!' : 'Salin JSON'}</span>
            </button>

            <button
              onClick={onBackToLanding}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Lihat Hasil</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-2 border-t border-slate-100 overflow-x-auto">
          {[
            { id: 'info', label: 'Profil & Kontak', icon: Settings },
            { id: 'kamar', label: `Kelola Kamar (${formData.roomTypes.length})`, icon: Bed },
            { id: 'faq', label: 'Tanya Jawab (FAQ)', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-4 border-b-2 font-semibold text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-600 text-emerald-700 bg-emerald-50/40'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Save Notification Toast */}
      {saveAlert && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-5 h-5" />
          <span className="text-sm font-bold">{saveMessage || 'Perubahan berhasil diterapkan ke tampilan website!'}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* Info Note */}
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <strong>💡 Database Real-Time:</strong> Anda dapat menambah kamar baru, mengupload foto kamar langsung ke <strong>Supabase Storage</strong>, dan menyimpan perubahan harga secara real-time.
          </div>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold underline shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset ke Data Awal
          </button>
        </div>

        {uploadError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center justify-between">
            <span>{uploadError}</span>
            <button onClick={() => setUploadError('')} className="font-bold underline text-xs">Tutup</button>
          </div>
        )}

        {/* TAB 1: INFO KOS & KONTAK */}
        {activeTab === 'info' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-4">
              Informasi Umum & Kontak Kos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Kos</label>
                <input
                  type="text"
                  value={formData.kosInfo.name}
                  onChange={(e) => handleInfoChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Badge Header</label>
                <input
                  type="text"
                  value={formData.kosInfo.badge}
                  onChange={(e) => handleInfoChange('badge', e.target.value)}
                  placeholder="Contoh: Eksklusif & Nyaman"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nomor WhatsApp (Angka Saja)</label>
                <input
                  type="text"
                  value={formData.kosInfo.whatsappNumber}
                  onChange={(e) => handleInfoChange('whatsappNumber', e.target.value)}
                  placeholder="Contoh: 6281234567890"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="text-[11px] text-slate-400">Gunakan format internasional tanpa tanda + (misal 628123...)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tampilan Nomor WhatsApp</label>
                <input
                  type="text"
                  value={formData.kosInfo.whatsappDisplay}
                  onChange={(e) => handleInfoChange('whatsappDisplay', e.target.value)}
                  placeholder="Contoh: +62 812-3456-7890"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Harga Mulai Dari</label>
                <input
                  type="text"
                  value={formData.kosInfo.startingPrice}
                  onChange={(e) => handleInfoChange('startingPrice', e.target.value)}
                  placeholder="Contoh: Rp 1.500.000"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Instagram</label>
                <input
                  type="text"
                  value={formData.kosInfo.instagram}
                  onChange={(e) => handleInfoChange('instagram', e.target.value)}
                  placeholder="Contoh: @grahaasri.kost"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tagline</label>
                <input
                  type="text"
                  value={formData.kosInfo.tagline}
                  onChange={(e) => handleInfoChange('tagline', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Utama (Sub-tagline)</label>
                <textarea
                  rows="3"
                  value={formData.kosInfo.subTagline}
                  onChange={(e) => handleInfoChange('subTagline', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Alamat Lengkap</label>
                <textarea
                  rows="2"
                  value={formData.kosInfo.address}
                  onChange={(e) => handleInfoChange('address', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Catatan Lokasi Dekat Kampus/Transportasi</label>
                <input
                  type="text"
                  value={formData.kosInfo.locationNote}
                  onChange={(e) => handleInfoChange('locationNote', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KELOLA KAMAR */}
        {activeTab === 'kamar' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Daftar Tipe Kamar ({formData.roomTypes.length})
                </h2>
                <span className="text-xs text-slate-500">
                  Tambah, hapus, upload foto, dan ubah status kamar kosong/penuh
                </span>
              </div>

              <button
                onClick={handleAddRoom}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Tipe Kamar Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {formData.roomTypes.map((room, idx) => (
                <div
                  key={room.id || idx}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6 relative"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{room.name}</h3>
                        <span className="text-xs text-slate-500">Ukuran: {room.size}</span>
                      </div>
                    </div>

                    {/* Status & Delete Actions */}
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        room.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {room.isAvailable ? `Tersedia (${room.available} Kamar)` : 'Penuh'}
                      </span>

                      <button
                        onClick={() => handleRoomAvailabilityToggle(idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                          room.isAvailable
                            ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        {room.isAvailable ? 'Set ke Penuh' : 'Set ke Tersedia'}
                      </button>

                      {formData.roomTypes.length > 1 && (
                        <button
                          onClick={() => handleDeleteRoom(idx)}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors"
                          title="Hapus Kamar Ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Tipe Kamar</label>
                      <input
                        type="text"
                        value={room.name}
                        onChange={(e) => handleRoomChange(idx, 'name', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Harga per Bulan (Rp)</label>
                      <input
                        type="number"
                        value={room.price}
                        onChange={(e) => handleRoomChange(idx, 'price', Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Jumlah Kamar Kosong</label>
                      <input
                        type="number"
                        value={room.available}
                        onChange={(e) => handleRoomChange(idx, 'available', Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ukuran / Dimensi</label>
                      <input
                        type="text"
                        value={room.size}
                        onChange={(e) => handleRoomChange(idx, 'size', e.target.value)}
                        placeholder="Contoh: 3 x 4 Meter"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tag / Label Kamar</label>
                      <input
                        type="text"
                        value={room.tag || ''}
                        onChange={(e) => handleRoomChange(idx, 'tag', e.target.value)}
                        placeholder="Contoh: Paling Populer / Hemat"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Harga Coret Promo (Opsional)</label>
                      <input
                        type="number"
                        value={room.originalPrice || ''}
                        onChange={(e) => handleRoomChange(idx, 'originalPrice', e.target.value ? Number(e.target.value) : null)}
                        placeholder="Kosongkan jika tidak promo"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>

                    {/* Image Upload Box */}
                    <div className="md:col-span-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                        Foto Kamar
                      </label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Preview Thumbnail */}
                        <div className="w-28 h-20 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0 relative">
                          {room.image ? (
                            <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                              <Image className="w-6 h-6 text-slate-300" />
                            </div>
                          )}
                          {uploadingIndex === idx && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-[11px] font-bold text-center p-1">
                              Mengunggah...
                            </div>
                          )}
                        </div>

                        {/* Upload Button & URL field */}
                        <div className="flex-1 space-y-2 w-full">
                          <div className="flex flex-wrap items-center gap-3">
                            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 text-xs font-bold shadow-sm transition-all">
                              <Upload className="w-4 h-4 text-emerald-600" />
                              <span>{uploadingIndex === idx ? 'Mengunggah ke Supabase...' : 'Upload Foto Baru'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                disabled={uploadingIndex === idx}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageUpload(idx, file);
                                }}
                                className="hidden"
                              />
                            </label>
                            <span className="text-xs text-slate-400">Format: JPG, PNG, WEBP</span>
                          </div>

                          <input
                            type="text"
                            value={room.image || ''}
                            onChange={(e) => handleRoomChange(idx, 'image', e.target.value)}
                            placeholder="Atau masukkan URL foto langsung"
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Facilities List */}
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Fasilitas di Dalam Kamar (Tulis 1 fasilitas per baris)
                      </label>
                      <textarea
                        rows="4"
                        value={Array.isArray(room.facilities) ? room.facilities.join('\n') : ''}
                        onChange={(e) => {
                          const facs = e.target.value.split('\n').filter((s) => s.trim() !== '');
                          handleRoomChange(idx, 'facilities', facs);
                        }}
                        placeholder="AC 0.5 PK Hemat Energi&#10;Kasur Single Springbed (100x200)&#10;Kamar Mandi Luar (Bersih & Terawat)&#10;Lemari Pakaian 2 Pintu&#10;Meja Belajar / Kerja + Kursi Ergonomis"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm leading-relaxed"
                      />
                      <span className="text-[11px] text-slate-400">Setiap baris baru akan otomatis menjadi poin fasilitas bercentang di popup kamar</span>
                    </div>

                    {/* Inclusions List (Biaya Lain & Ketentuan) */}
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Biaya Lain & Ketentuan (Tulis 1 ketentuan per baris)
                      </label>
                      <textarea
                        rows="3"
                        value={Array.isArray(room.inclusions) ? room.inclusions.join('\n') : ''}
                        onChange={(e) => {
                          const incs = e.target.value.split('\n').filter((s) => s.trim() !== '');
                          handleRoomChange(idx, 'inclusions', incs);
                        }}
                        placeholder="Termasuk Air Bersih&#10;Termasuk Iuran Sampah & Kebersihan&#10;Listrik Token Mandiri (900 VA)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm leading-relaxed"
                      />
                      <span className="text-[11px] text-slate-400">Setiap baris baru akan muncul di kotak 'Biaya Lain & Ketentuan' di popup kamar</span>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Kamar</label>
                      <textarea
                        rows="2"
                        value={room.description || ''}
                        onChange={(e) => handleRoomChange(idx, 'description', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FAQ */}
        {activeTab === 'faq' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-4">
                Pertanyaan Umum (FAQ)
              </h2>
              {formData.faqs.map((faqItem, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <input
                    type="text"
                    value={faqItem.q}
                    onChange={(e) => {
                      const updatedFaqs = [...formData.faqs];
                      updatedFaqs[idx].q = e.target.value;
                      setFormData({ ...formData, faqs: updatedFaqs });
                    }}
                    placeholder="Pertanyaan"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-semibold bg-white"
                  />
                  <textarea
                    rows="2"
                    value={faqItem.a}
                    onChange={(e) => {
                      const updatedFaqs = [...formData.faqs];
                      updatedFaqs[idx].a = e.target.value;
                      setFormData({ ...formData, faqs: updatedFaqs });
                    }}
                    placeholder="Jawaban"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs sm:text-sm bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
