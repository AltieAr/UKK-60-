import React, { useState, useEffect } from 'react';
import { Container, Card, Table, InputGroup, Form, Badge, Spinner, Button } from 'react-bootstrap';
import OwnerLayout from '../layout/OwnerLayout'; 

import { useOwnerHistory } from '../hooks/useOwnerHistory';
import { formatTime } from '../utils/helpers';

function OwnerHistory() {
  const brandPink = '#f92c9f'; 

  const { logs, isLoading } = useOwnerHistory();
  
  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const getRoleBadge = (role) => {
    const r = String(role).toLowerCase();
    if (r === 'owner') return 'dark';     
    if (r === 'admin') return 'success';  
    if (r === 'operator') return 'info';  
    return 'secondary';
  };

  // Balikin ke page 1 tiap kali filter diketik/dipilih
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, startDate, endDate]);

  // --- LOGIC FILTER GABUNGAN (SEARCH + TANGGAL) ---
  const filteredLogs = logs.filter(log => {
    // 1. Cek Text Search
    const searchLower = searchTerm.toLowerCase();
    const userName = log.User?.full_name?.toLowerCase() || '';
    const activityInfo = log.activity?.toLowerCase() || '';
    const isMatchSearch = userName.includes(searchLower) || activityInfo.includes(searchLower);

    // 2. Cek Tanggal
    let isMatchDate = true;
    if (log.activity_time) {
      // Potong jadi YYYY-MM-DD
      const logDate = new Date(log.activity_time).toISOString().split('T')[0];
      
      if (startDate && logDate < startDate) isMatchDate = false;
      if (endDate && logDate > endDate) isMatchDate = false;
    }

    return isMatchSearch && isMatchDate;
  });

  // --- LOGIC PAGINATION ---
  const indexOfLastLog = currentPage * itemsPerPage;
  const indexOfFirstLog = indexOfLastLog - itemsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  if (currentPage === 1) {
    endPage = Math.min(3, totalPages);
  } else if (currentPage === totalPages) {
    startPage = Math.max(1, totalPages - 2);
  }

  let pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // --- FUNGSI RESET ---
  const resetFilter = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <OwnerLayout>
      <Container fluid className="px-4 py-4">
        
        <div className="mb-4">
          <h4 className="fw-bold mb-1">Activity Logs (Riwayat Sistem)</h4>
          <p className="text-muted small">Pantau semua aktivitas pengguna, admin, dan operator di dalam sistem.</p>
        </div>

        <Card className="shadow-sm border-0 rounded-4 p-4">
          
          {/* =========================================
              HEADER TABEL & FILTER AREA (UDAH DIRAPIHIN)
              ========================================= */}
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
            <h5 className="fw-bold mb-0">Daftar Aktivitas</h5>
            
            <div className="d-flex flex-wrap align-items-center gap-2">
              {/* Kotak Search */}
              <InputGroup className="border rounded-3 overflow-hidden shadow-sm" style={{ width: '220px' }}>
                <InputGroup.Text className="bg-white border-0 text-muted">🔍</InputGroup.Text>
                <Form.Control 
                  type="text" 
                  placeholder="Cari..." 
                  className="border-0 shadow-none" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>

              {/* Kotak Dari Tanggal */}
              <div>
                <Form.Control 
                  type="date" 
                  className="bg-light border-0 shadow-sm text-muted rounded-3" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                  title="Dari Tanggal"
                />
              </div>

              {/* Kotak Sampai Tanggal */}
              <div>
                <Form.Control 
                  type="date" 
                  className="bg-light border-0 shadow-sm text-muted rounded-3" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)}
                  title="Sampai Tanggal"
                />
              </div>

              {/* Tombol Reset Pink */}
              {(startDate || endDate || searchTerm) && (
                <Button 
                  onClick={resetFilter}
                  className="fw-bold px-3 rounded-pill border-0 text-white shadow-sm"
                  style={{ backgroundColor: brandPink, fontSize: '0.8rem', height: '38px' }}
                >
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* =========================================
              TABEL DATA
              ========================================= */}
          <Table responsive hover className="align-middle border-bottom mb-0">
            <thead>
              <tr style={{ fontSize: '0.9rem', backgroundColor: '#f8f9fa' }}>
                <th className="border-0 py-3">ID Log</th>
                <th className="border-0 py-3">Waktu Kejadian</th>
                <th className="border-0 py-3">Pengguna</th>
                <th className="border-0 py-3">Role</th>
                <th className="border-0 py-3 w-50">Detail Aktivitas</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.9rem' }}>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <Spinner animation="border" variant="secondary" size="sm" className="me-2" /> Memuat data log aktivitas...
                  </td>
                </tr>
              ) : currentLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-danger fw-bold">
                    {(searchTerm || startDate || endDate) ? 'Tidak ditemukan data yang sesuai dengan filter.' : 'Belum ada data log aktivitas.'}
                  </td>
                </tr>
              ) : (
                currentLogs.map((log, index) => (
                  <tr key={log.id_log || index}>
                    <td className="text-muted">#{log.id_log}</td>
                    <td className="fw-bold text-muted small">{formatTime(log.activity_time)}</td>
                    <td className="fw-bold text-capitalize">{log.User?.full_name || 'System / Unknown'}</td>
                    <td>
                      <Badge bg={getRoleBadge(log.User?.role)} className="px-3 py-2 rounded-pill text-uppercase" style={{ fontSize: '0.7rem' }}>
                        {log.User?.role || '-'}
                      </Badge>
                    </td>
                    <td className="text-muted">{log.activity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          
          {/* =========================================
              CUSTOM PAGINATION
              ========================================= */}
          {!isLoading && filteredLogs.length > 0 && (
            <div className="d-flex flex-column align-items-center mt-4">
              <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                <span 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#ced4da' : '#6c757d', fontWeight: '500', marginRight: '10px', userSelect: 'none' }}
                >
                  Previous
                </span>

                {pageNumbers.map(number => (
                  <div 
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: '35px', height: '35px', borderRadius: '8px',
                      backgroundColor: currentPage === number ? brandPink : '#e9ecef',
                      color: currentPage === number ? 'white' : '#6c757d',
                      fontWeight: 'bold', cursor: 'pointer', userSelect: 'none', transition: '0.2s'
                    }}
                  >
                    {number}
                  </div>
                ))}

                <span 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#ced4da' : '#6c757d', fontWeight: '500', marginLeft: '10px', userSelect: 'none' }}
                >
                  Next
                </span>
              </div>
              <span className="text-muted small">
                Menampilkan {indexOfFirstLog + 1} - {Math.min(indexOfLastLog, filteredLogs.length)} dari {filteredLogs.length} data
              </span>
            </div>
          )}

        </Card>
      </Container>
    </OwnerLayout>
  );
}

export default OwnerHistory;