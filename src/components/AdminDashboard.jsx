import React, { useState, useRef, useEffect } from 'react';
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
  Sparkles,
  ChevronDown,
  Wind,
  Bath,
  Briefcase,
  Layers,
  Sun,
  Wifi,
  Utensils,
  Coffee,
  Shirt,
  Users,
  TreePine,
  ShieldCheck,
  Key,
  Car,
  Clock,
} from 'lucide-react';
import { uploadKosImage } from '../lib/supabase';

const ADMIN_PIN = 'admin123'; // Default PIN

const ICON_OPTIONS = [
  { value: 'Wind', label: 'AC / Sirkulasi Udara' },
  { value: 'Bath', label: 'Kamar Mandi / Shower' },
  { value: 'Bed', label: 'Kasur / Ranjang' },
  { value: 'Briefcase', label: 'Meja Belajar / Kerja' },
  { value: 'Layers', label: 'Lemari Pakaian / Cermin' },
  { value: 'Sun', label: 'Jendela / Pencahayaan Alami' },
  { value: 'Wifi', label: 'WiFi / Internet Fiber' },
  { value: 'Utensils', label: 'Dapur / Kompor Gas' },
  { value: 'Coffee', label: 'Kulkas / Dispenser Air Minum' },
  { value: 'Shirt', label: 'Mesin Cuci / Jemuran' },
  { value: 'Users', label: 'Ruang Tamu / Santai' },
  { value: 'TreePine', label: 'Rooftop / Area Terbuka' },
  { value: 'ShieldCheck', label: 'CCTV 24 Jam' },
  { value: 'Key', label: 'Smart Door Lock / Kartu RFID' },
  { value: 'Car', label: 'Parkir Motor / Mobil Berkanopi' },
  { value: 'Clock', label: 'Bebas Jam Malam / 24 Jam' },
  { value: 'Sparkles', label: 'Fasilitas Lainnya' },
];

const ICON_MAP = {
  Wind,
  Bath,
  Bed,
  Briefcase,
  Layers,
  Sun,
  Wifi,
  Utensils,
  Coffee,
  Shirt,
  Users,
  TreePine,
  ShieldCheck,
  Key,
  Car,
  Clock,
  Sparkles,
};

/**
 * Custom Dropdown for Room Availability Status
 */
function RoomStatusDropdown({ isAvailable, count, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('pointerdown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isOpen]);

  const selectStatus = (status) => {
    onChange(status);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isAvailable
            ? 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-emerald-600/20'
            : 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-red-600/20'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-white shrink-0 shadow-xs" />
        <span>{isAvailable ? `Tersedia (${count > 0 ? count : 1} Kamar)` : 'Penuh'}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-40 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1.5">
            Status Ketersediaan
          </div>
          <button
            type="button"
            onClick={() => selectStatus('tersedia')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
              isAvailable
                ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200/80'
                : 'text-slate-700 hover:bg-slate-50 font-medium'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Tersedia ({count > 0 ? count : 1} Kamar)
                </div>
                <div className="text-[10px] text-slate-400 font-normal">
                  Kamar aktif & dapat dibooking
                </div>
              </div>
            </div>
            {isAvailable && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
          </button>

          <button
            type="button"
            onClick={() => selectStatus('penuh')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer mt-1 ${
              !isAvailable
                ? 'bg-red-50 text-red-900 font-bold border border-red-200/80'
                : 'text-slate-700 hover:bg-slate-50 font-medium'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900">Penuh (0 Kamar)</div>
                <div className="text-[10px] text-slate-400 font-normal">
                  Ditandai penuh di katalog kos
                </div>
              </div>
            </div>
            {!isAvailable && <Check className="w-4 h-4 text-red-600 shrink-0" />}
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Custom Dropdown for Facility Icon Selector
 */
function IconSelectDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('pointerdown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOpt = ICON_OPTIONS.find((opt) => opt.value === value) || ICON_OPTIONS[0];
  const SelectedIcon = ICON_MAP[selectedOpt.value] || Sparkles;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 flex items-center justify-between hover:border-emerald-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer shadow-xs"
      >
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <SelectedIcon className="w-3.5 h-3.5" />
          </div>
          <span className="truncate">{selectedOpt.label}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white rounded-2xl shadow-2xl border border-slate-100 p-1.5 max-h-60 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
            Pilih Ikon Fasilitas
          </div>
          <div className="space-y-0.5">
            {ICON_OPTIONS.map((opt) => {
              const IconComp = ICON_MAP[opt.value] || Sparkles;
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200/80'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{opt.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

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
  const [facilityCategory, setFacilityCategory] = useState('kamar');

  // Local state copy of kos data
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(data)));

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN salah! Silakan periksa kembali PIN Anda.');
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
      const updatedRoom = {
        ...updatedRooms[index],
        [field]: value,
      };
      if (field === 'available') {
        const num = Number(value);
        updatedRoom.available = num;
        updatedRoom.isAvailable = num > 0;
      }
      updatedRooms[index] = updatedRoom;
      return {
        ...prev,
        roomTypes: updatedRooms,
      };
    });
  };

  const handleStatusChange = (index, status) => {
    setFormData((prev) => {
      const updatedRooms = [...prev.roomTypes];
      const isAvailable = status === 'tersedia';
      updatedRooms[index] = {
        ...updatedRooms[index],
        isAvailable,
        available: isAvailable ? (updatedRooms[index].available > 0 ? updatedRooms[index].available : 1) : 0,
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

  // Facility handlers
  const handleAddFacility = (category) => {
    const newFac = {
      title: 'Fasilitas Baru',
      desc: 'Keterangan fasilitas untuk kenyamanan penghuni.',
      icon: category === 'kamar' ? 'Bed' : category === 'bersama' ? 'Wifi' : 'ShieldCheck',
    };
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [category]: [...(prev.facilities?.[category] || []), newFac],
      },
    }));
  };

  const handleFacilityChange = (category, index, field, value) => {
    setFormData((prev) => {
      const updatedList = [...(prev.facilities?.[category] || [])];
      updatedList[index] = {
        ...updatedList[index],
        [field]: value,
      };
      return {
        ...prev,
        facilities: {
          ...prev.facilities,
          [category]: updatedList,
        },
      };
    });
  };

  const handleDeleteFacility = (category, index) => {
    const facName = formData.facilities?.[category]?.[index]?.title || 'fasilitas ini';
    if (window.confirm(`Hapus "${facName}"?`)) {
      setFormData((prev) => {
        const updatedList = [...(prev.facilities?.[category] || [])];
        updatedList.splice(index, 1);
        return {
          ...prev,
          facilities: {
            ...prev.facilities,
            [category]: updatedList,
          },
        };
      });
    }
  };

  // Stats handlers
  const handleStatChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedStats = [...(prev.stats || [])];
      updatedStats[index] = {
        ...updatedStats[index],
        [field]: value,
      };
      return {
        ...prev,
        stats: updatedStats,
      };
    });
  };

  const handleAddStat = () => {
    const newStat = {
      value: 'Keunggulan Baru',
      label: 'Kategori',
      sub: 'Keterangan keunggulan kos',
    };
    setFormData((prev) => ({
      ...prev,
      stats: [...(prev.stats || []), newStat],
    }));
  };

  const handleDeleteStat = (index) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kartu keunggulan ini?')) {
      setFormData((prev) => {
        const updatedStats = [...(prev.stats || [])];
        updatedStats.splice(index, 1);
        return {
          ...prev,
          stats: updatedStats,
        };
      });
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
                placeholder="Masukkan PIN Keamanan"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-center text-lg tracking-widest focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
            { id: 'kamar', label: `Kelola Kamar (${formData.roomTypes?.length || 0})`, icon: Bed },
            { id: 'fasilitas', label: 'Fasilitas Kos', icon: Sparkles },
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
            <span className="inline-flex items-center gap-1.5 font-bold mr-1">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              Database Real-Time:
            </span>
            Anda dapat menambah kamar baru, mengupload foto kamar langsung ke <strong>Supabase Storage</strong>, dan menyimpan perubahan harga secara real-time.
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Badge Header</label>
                <input
                  type="text"
                  value={formData.kosInfo.badge}
                  onChange={(e) => handleInfoChange('badge', e.target.value)}
                  placeholder="Contoh: Eksklusif & Nyaman"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nomor WhatsApp (Angka Saja)</label>
                <input
                  type="text"
                  value={formData.kosInfo.whatsappNumber}
                  onChange={(e) => handleInfoChange('whatsappNumber', e.target.value)}
                  placeholder="Contoh: 6281234567890"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Harga Mulai Dari</label>
                <input
                  type="text"
                  value={formData.kosInfo.startingPrice}
                  onChange={(e) => handleInfoChange('startingPrice', e.target.value)}
                  placeholder="Contoh: Rp 1.500.000"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Instagram</label>
                <input
                  type="text"
                  value={formData.kosInfo.instagram}
                  onChange={(e) => handleInfoChange('instagram', e.target.value)}
                  placeholder="Contoh: @grahaasri.kost"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tagline</label>
                <input
                  type="text"
                  value={formData.kosInfo.tagline}
                  onChange={(e) => handleInfoChange('tagline', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Utama (Sub-tagline)</label>
                <textarea
                  rows="3"
                  value={formData.kosInfo.subTagline}
                  onChange={(e) => handleInfoChange('subTagline', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Alamat Lengkap</label>
                <textarea
                  rows="2"
                  value={formData.kosInfo.address}
                  onChange={(e) => handleInfoChange('address', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Catatan Lokasi Dekat Kampus/Transportasi</label>
                <input
                  type="text"
                  value={formData.kosInfo.locationNote}
                  onChange={(e) => handleInfoChange('locationNote', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* KARTU KEUNGGULAN / STATISTIK */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Kartu Keunggulan / Statistik (Tampil di Bawah Header)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Atur poin keunggulan utama yang tampil di bawah header (contoh: Aman & Nyaman, Keamanan 24 Jam, WiFi 100 Mbps)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddStat}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition-all shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Kartu</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(formData.stats || []).map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Kartu #{idx + 1}
                      </span>
                      {(formData.stats || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteStat(idx)}
                          className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Kartu Ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Teks Utama / Nilai
                      </label>
                      <input
                        type="text"
                        value={stat.value || ''}
                        onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                        placeholder="Contoh: Aman & Nyaman / 24 Jam / 100 Mbps"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Label Kategori
                      </label>
                      <input
                        type="text"
                        value={stat.label || ''}
                        onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                        placeholder="Contoh: Lingkungan / Keamanan / Kecepatan WiFi"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Keterangan Tambahan
                      </label>
                      <input
                        type="text"
                        value={stat.sub || ''}
                        onChange={(e) => handleStatChange(idx, 'sub', e.target.value)}
                        placeholder="Contoh: Kondusif untuk Istirahat & Belajar"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-500 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>
                ))}
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

                    {/* Status Toggle Dropdown & Delete Action */}
                    <div className="flex items-center gap-3">
                      {/* Custom Status Dropdown */}
                      <RoomStatusDropdown
                        isAvailable={room.isAvailable}
                        count={room.available}
                        onChange={(status) => handleStatusChange(idx, status)}
                      />

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
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Harga per Bulan (Rp)</label>
                      <input
                        type="number"
                        value={room.price}
                        onChange={(e) => handleRoomChange(idx, 'price', Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Jumlah Kamar Kosong</label>
                      <input
                        type="number"
                        value={room.available}
                        onChange={(e) => handleRoomChange(idx, 'available', Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ukuran / Dimensi</label>
                      <input
                        type="text"
                        value={room.size}
                        onChange={(e) => handleRoomChange(idx, 'size', e.target.value)}
                        placeholder="Contoh: 3 x 4 Meter"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tag / Label Kamar</label>
                      <input
                        type="text"
                        value={room.tag || ''}
                        onChange={(e) => handleRoomChange(idx, 'tag', e.target.value)}
                        placeholder="Contoh: Paling Populer / Hemat"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Harga Coret Promo (Opsional)</label>
                      <input
                        type="number"
                        value={room.originalPrice || ''}
                        onChange={(e) => handleRoomChange(idx, 'originalPrice', e.target.value ? Number(e.target.value) : null)}
                        placeholder="Kosongkan jika tidak promo"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm leading-relaxed focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm leading-relaxed focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                      <span className="text-[11px] text-slate-400">Setiap baris baru akan muncul di kotak 'Biaya Lain & Ketentuan' di popup kamar</span>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Kamar</label>
                      <textarea
                        rows="2"
                        value={room.description || ''}
                        onChange={(e) => handleRoomChange(idx, 'description', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FASILITAS KOS */}
        {activeTab === 'fasilitas' && (
          <div className="space-y-6">
            {/* Category Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Kelola Fasilitas Kos</h2>
                <span className="text-xs text-slate-500">
                  Ubah fasilitas kamar pribadi, fasilitas bersama, dan keamanan & parkir
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'kamar', label: 'Fasilitas Kamar', count: formData.facilities?.kamar?.length || 0 },
                  { id: 'bersama', label: 'Fasilitas Bersama', count: formData.facilities?.bersama?.length || 0 },
                  { id: 'keamanan', label: 'Keamanan & Parkir', count: formData.facilities?.keamanan?.length || 0 },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFacilityCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                      facilityCategory === cat.id
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] ${
                        facilityCategory === cat.id ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section Header with Add button */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Daftar {facilityCategory === 'kamar' ? 'Fasilitas Kamar' : facilityCategory === 'bersama' ? 'Fasilitas Bersama' : 'Keamanan & Parkir'} ({formData.facilities?.[facilityCategory]?.length || 0})
              </h3>
              <button
                onClick={() => handleAddFacility(facilityCategory)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Fasilitas</span>
              </button>
            </div>

            {/* Facilities Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(formData.facilities?.[facilityCategory] || []).map((fac, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                      #{idx + 1}
                    </span>
                    <button
                      onClick={() => handleDeleteFacility(facilityCategory, idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Hapus Fasilitas Ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Judul Fasilitas
                    </label>
                    <input
                      type="text"
                      value={fac.title || ''}
                      onChange={(e) => handleFacilityChange(facilityCategory, idx, 'title', e.target.value)}
                      placeholder="Contoh: WiFi Cepat 100 Mbps"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Pilihan Icon
                    </label>
                    <IconSelectDropdown
                      value={fac.icon || 'Sparkles'}
                      onChange={(newIcon) => handleFacilityChange(facilityCategory, idx, 'icon', newIcon)}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Deskripsi Fasilitas
                    </label>
                    <textarea
                      rows="2"
                      value={fac.desc || ''}
                      onChange={(e) => handleFacilityChange(facilityCategory, idx, 'desc', e.target.value)}
                      placeholder="Jelaskan fasilitas ini..."
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FAQ */}
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
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-semibold bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
