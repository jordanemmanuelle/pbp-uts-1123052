import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function ShowAllBook () {
    const [ books, setBooks ] = useState<Book[]>([]);
    const navigate = useNavigate();

    const DaftarBuku = async () => {
        try {
            const response = await fetch('/api/buku');
            if (!response.ok) return;

            const data = await response.json();
            setBooks(Array.isArray(data) ? data : data.data || []);
        } catch (error) {
            console.error("Terjadi kesalahan: ", error);
        }
    };

    useEffect (() => {
        DaftarBuku();
    }, []);

    return (
        <div>
            <h1> Daftar Buku </h1>
            <p> Total Buku yang Terdaftar: {books.length} </p>

            {books.length > 0 ? (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <div>
                                <strong> {book.judul} </strong>
                                <p> {book.kategori} </p>
                                <p> {book.deskripsi} </p>
                                <p> {book.status} </p>
                                {/* <p> <img src={book.imageUrl}> </img> </p> */}
                            </div>

                            <div className="button-group">
                                <button onClick={() => navigate(`/GetDetailBook/${book.id}`)}> Detail Buku </button>
                                <button onClick={() => navigate(`/UpdateBook/${book.id}`)}> Update </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p> Belum ada buku yang terdaftar</p>
            )}
        </div>
    );
}