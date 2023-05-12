import { useState } from "react";

const InputInfo = (props) => {

    const [maSV, setMaSv] = useState("")
    const [tenSV, setTenSv] = useState("")
    const [ngaySinh, setNgaySinh] = useState("")
    const [gioiTinh, setGioiTinh] = useState("")
    const [khoa, setkhoa] = useState("Toán")

    const handleSubmit = () => {
        if (!maSV || !tenSV || !ngaySinh || !gioiTinh || !khoa) {
            alert("Hãy điền đầy đủ thông tin !!")
            return;
        }
        let nSinhVien = {
            maSV: maSV,
            tenSV: tenSV,
            ngaySinh: ngaySinh,
            gioiTinh: gioiTinh,
            khoa: khoa
        }
        props.handleAddSV(nSinhVien)
        console.log(nSinhVien);
    }

    return (
        <div className="InputInfo-container">
            <div className="InputInfo-input">
                <div className="InputInfo MaSV">
                    <label>Mã SV: </label>
                    <input
                        type="text" value={maSV}
                        onChange={(event) => setMaSv(event.target.value)}
                    />
                </div>
                <div className="InputInfo TenSV">
                    <label>Tên SV: </label>
                    <input
                        type="text" value={tenSV}
                        onChange={(event) => setTenSv(event.target.value)}
                    />
                </div>
                <div className="InputInfo NgaySinh">
                    <label>Ngày sinh: </label>
                    <input
                        type="date"
                        value={ngaySinh}
                        onChange={(event) => { setNgaySinh(event.target.value) }}
                    />
                </div>
                <div className="InputInfo GioiTinh">
                    <label>Giới Tính: </label>
                    <input
                        type="radio"
                        value="Nam"
                        name="gender"
                        onChange={(event) => setGioiTinh(event.target.value)}
                    /> Nam
                    <input
                        type="radio"
                        value="Nữ"
                        name="gender"
                        onChange={(event) => setGioiTinh(event.target.value)}
                    /> Nữ
                </div>
                <div className="InputInfo Khoa">
                    <label>Khoa: </label>
                    <select value={khoa} onChange={(event) => setkhoa(event.target.value)}>
                        <option value={'Toán'}>Toán</option>
                        <option value={'Lý'}>Lý</option>
                        <option value={'Hóa'}>Hóa</option>
                        <option value={'Anh'}>Anh</option>
                        <option value={'Văn'}>Văn</option>
                        <option value={'Sử'}>Sử</option>
                        <option value={'Địa'}>Địa</option>
                    </select>
                </div>

                <button onClick={() => handleSubmit()}>Submit</button>
            </div>
        </div>
    )
}

export default InputInfo;