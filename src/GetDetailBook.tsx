import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Book = {
    id: string;
    judul: string;
    deskripsi: string;
    tahun: number;
    kategori: string;
    status: string; // borrowed
    peminjam: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function DetailDataBuku() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book | null>(null);

    useEffect(() => {
        const fetchDetailBuku = async () => {
            try {
                const response = await fetch(`/api/buku/${id}`);
                const data = await response.json();
                const detailData = data.data || data.record || data;

                setBooks(detailData);
            } catch (error) {
                console.error("Error mengambil detail buku: ", error);
                alert("Gagal melihat data buku");
            }
        };

        if (id) {
            fetchDetailBuku();
        }
    }, [id]);

    if(!books) {
        return (
            <div>
                <p> Loading data buku </p>
            </div>
        );
    }

    return (
        <div>
            <h1> Detail Buku </h1>
            <div>
                <h2> {books.judul} </h2>
                <hr style={{borderColor: '#333' }}> </hr>

                <p> <strong> {books.deskripsi} </strong> </p>
                <p> <strong> {books.tahun} </strong> </p>
                <p> <strong> {books.kategori} </strong> </p>
                <p> <strong> {books.status} </strong> </p>
            </div>

            <div style={{ marginTop: '20px'}}>
                <button onClick={() => navigate("/")}> Kembali ke Daftar</button>
            </div>
        </div>
    )
}