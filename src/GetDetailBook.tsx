import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Buku = {
    id: string;
    judul: string;
    deskripsi: string;
    tahun: string;
    kategori: string;
    status: string;
    peminjam: { nama: string } | null;
    imageUrl: string;
}

export default function DetailDataBuku() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [buku, setBuku] = useState<Buku | null>(null);

    const fetchDetailBuku = async () => {
        try {
            const response = await fetch(`/api/buku/${id}`);
            const data = await response.json();
            setBuku(data.data || data);
        } catch (error) {
            console.error("Error", error);
        }
    };

    useEffect(() => {
        if (id) fetchDetailBuku();
    }, [id]);

    const handlePinjam = async () => {
        const namaPeminjam = window.prompt("Masukkan nama peminjam:");
        if (!namaPeminjam) return;

        try {
            const response = await fetch(`/api/buku/${id}/pinjam`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ peminjam: { nama: namaPeminjam } }) 
            });

            if (!response.ok) throw new Error("Gagal");
            alert("Buku berhasil dipinjam");
            fetchDetailBuku(); 
        } catch (error) {
            alert("Gagal meminjam buku");
        }
    };

    const handleKembalikan = async () => {
        try {
            const response = await fetch(`/api/buku/${id}/balik`, { 
                method: 'POST'
            });

            if (!response.ok) throw new Error("Gagal");
            alert("Buku berhasil dikembalikan"); 
            fetchDetailBuku();
        } catch (error) {
            alert("Gagal mengembalikan buku");
        }
    };

    if (!buku) return <p style={{ textAlign: 'center' }}>Loading data</p>;

    return (
        <div>
            <h1> Detail Buku </h1>
            <div>
                {buku.imageUrl && (
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    </div>
                )}
                
                <h2> {buku.judul} </h2>
                <p> <strong> ID Buku: </strong> {buku.id} </p>
                <p> <strong> Deskripsi: </strong> {buku.deskripsi} </p>
                <p> <strong> Tahun: </strong> {buku.tahun} </p>
                <p> <strong> Kategori: </strong> {buku.kategori} </p>
                <p> <strong> Status: </strong> {buku.status === 'borrowed' ? 'Sedang Dipinjam' : 'Tersedia'} </p>
                
                {buku.status === 'borrowed' && buku.peminjam && (
                    <p> <strong> Dipinjam Oleh: </strong> {buku.peminjam.nama} </p>
                )}
            </div>

            <div className="button-group">
                {buku.status === 'borrowed' ? (
                    <button onClick={handleKembalikan}> Kembalikan Buku </button>
                ) : (
                    <button onClick={handlePinjam}> Pinjam Buku </button>
                )}
                <button type="button" onClick={() => navigate("/")}> Kembali ke Daftar </button>
            </div>
        </div>
    )
}