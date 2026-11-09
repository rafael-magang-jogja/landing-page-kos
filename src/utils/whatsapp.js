/**
 * Generates a direct WhatsApp link with a pre-filled, URL-encoded message
 * @param {string} phone - Phone number without plus, e.g. "6281234567890"
 * @param {string} message - Message text
 * @returns {string} WhatsApp API URL
 */
export const getWhatsAppLink = (phone, message) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

export const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
};
