import { useState, useEffect } from 'react';
import axios from 'axios';

export const useOwnerDashboard = () => {
  // 1. STATE DATA DARI API
  const [summary, setSummary] = useState({ total_pendapatan: 0, jumlah_kendaraan_keluar: 0 });
  const [realtimeArea, setRealtimeArea] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. STATE BUAT FILTER TANGGAL (INI YANG ILANG DI KODINGAN LU TADI)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // 3. FETCH DATA DARI API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3030/api/owner/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = response.data.data || {};
        
        setSummary(data.summary || { total_pendapatan: 0, jumlah_kendaraan_keluar: 0 });
        setRealtimeArea(data.realtime_area || []);
        
        const trxData = data.detail_transaksi || [];
        setTransactions(trxData);
        setFilteredTransactions(trxData); // Pas awal load, tampilin semua transaksi
      } catch (error) {
        console.error("Gagal narik data dashboard owner:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 4. LOGIC FILTER TANGGAL OTOMATIS JALAN
  useEffect(() => {
    if (transactions.length > 0) {
      let result = transactions;

      if (startDate || endDate) {
        result = transactions.filter(trx => {
          let isMatchDate = true;
          if (trx.check_in) {
            const trxDate = new Date(trx.check_in).toISOString().split('T')[0];
            if (startDate && trxDate < startDate) isMatchDate = false;
            if (endDate && trxDate > endDate) isMatchDate = false;
          }
          return isMatchDate;
        });
      }
      setFilteredTransactions(result);
    } else {
      setFilteredTransactions([]);
    }
  }, [transactions, startDate, endDate]);

  // 5. FUNGSI RESET TANGGAL
  const resetFilter = () => {
    setStartDate('');
    setEndDate('');
  };

  // 6. LEMPAR SEMUANYA BIAR BISA DIPAKE SAMA OwnerDashboard.jsx
  return { 
    summary, 
    realtimeArea, 
    filteredTransactions, // Kita lempar transaksi yang udah di-filter
    isLoading,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    resetFilter
  };
};