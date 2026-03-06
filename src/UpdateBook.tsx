import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBuku() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tahun, setTahun] = useState("");
    const [kategori, setKategori] = useState("")

    useEffect(() => {
        const fetchDataBUku = async () => {
            try {
                const response = await fetch(`/api/buku/${id}`);
                const data = await response.json();
                const book = data.data || data.record || data;

                setJudul(book.judul);
                setDeskripsi(book.deskripsi);
                setTahun(book.tahun);
                setKategori(book.kategori);
            } catch (error) {
                console.error("Error ambil data buku: ", error);
                alert("Gagal melihat detail buku");
            }
        };

        if (id) {
            fetchDataBUku;
        }
    }, [id]);

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/buku/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    judul: judul,
                    deskripsi: deskripsi,
                    tahun: tahun,
                    kategori: kategori
                })
            });

            if (!response.ok) throw new Error("Gagal update data buku");

            alert("Data buku sudah diupdate");
            navigate("/");
        } catch (error) {
            console.error ("Ada error: ", error);
            alert("gagal update data buku")
        }
    };

    return (
        <div>
            <h1> Update Buku </h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <label> Judul </label>
                    <input type="text" value={judul}
                    onChange={(e) => setJudul(e.target.value)} 
                    required />
                </div>

                <div>
                    <label> Deskripsi </label>
                    <input type="text" value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)} 
                    required />
                </div>

                <div>
                    <label> Tahun </label>
                    <input type="number" value={tahun}
                    onChange={(e) => setTahun(e.target.value)} 
                    required />
                </div>

                <div>
                    <label> Kategori </label>
                    <input type="text" value={kategori}
                    onChange={(e) => setKategori(e.target.value)} 
                    required />
                </div>

                <div>
                    <button type="button" onClick={() => navigate("/")}> Batal </button>
                    <button type="submit"> Update Data Buku </button>
                </div>
                
            </form>
        </div>
    )
}