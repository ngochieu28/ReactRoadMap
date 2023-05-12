import './style.scss'
import { useState, useEffect } from 'react';
import AddSV from './AddSV';
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersSlash } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';


const DisplayArea = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [sinhVien, setSinhVien] = useState([
        { maSV: 'A01', tenSV: 'Nguyễn Anh Tuấn', ngaySinh: '2001-01-01', gioiTinh: 'Nam', khoa: 'Toán' },
        { maSV: 'A02', tenSV: 'Phạm Thị Hồng Nhung', ngaySinh: '2002-02-02', gioiTinh: 'Nữ', khoa: 'Lý' },
        { maSV: 'A03', tenSV: 'Trần Minh Quang', ngaySinh: '2003-03-03', gioiTinh: 'Nam', khoa: 'Hóa' },
        { maSV: 'A04', tenSV: 'Phạm Hữu Đức', ngaySinh: '2004-04-04', gioiTinh: 'Nam', khoa: 'Sinh' },
        { maSV: 'A05', tenSV: 'Vũ Thị Thu Hà', ngaySinh: '2005-05-05', gioiTinh: 'Nữ', khoa: 'Sử' },
        { maSV: 'A06', tenSV: 'Ngô Xuân Phúc', ngaySinh: '2006-06-06', gioiTinh: 'Nam', khoa: 'Địa' },
        { maSV: 'A07', tenSV: 'Bùi Thị Ngọc Ánh', ngaySinh: '2007-07-07', gioiTinh: 'Nữ', khoa: 'Văn' },
        { maSV: 'A08', tenSV: 'Đỗ Thị Mai Anh', ngaySinh: '2008-08-08', gioiTinh: 'Nữ', khoa: 'Anh' },
        { maSV: 'A09', tenSV: 'Vũ Đức Thắng', ngaySinh: '2009-09-09', gioiTinh: 'Nam', khoa: 'Toán' },
        { maSV: 'A10', tenSV: 'Lê Thị Kim Anh', ngaySinh: '2010-10-10', gioiTinh: 'Nữ', khoa: 'Văn' },
    ])

    const [editSinhVien, setEditSinhVien] = useState("");
    const [seachSinhVien, setSeachSinhVien] = useState("")


    const handleDelete = (maSV) => {
        let text = "Bạn có chắc chắn muốn xóa sinh viên này không ?";
        if (window.confirm(text) === true) {
            let currentSinhVien = sinhVien;
            currentSinhVien = currentSinhVien.filter(item => item.maSV !== maSV)
            setSinhVien(currentSinhVien)

            toast.success("Delete Successfully !!")
        } else {
            return;
        }
    }



    const handleAddSV = (nSinhVien) => {
        let isMaSVExisted = sinhVien.some((item) => item.maSV === nSinhVien.maSV);

        if (isMaSVExisted) {
            alert("MaSV đã tồn tại !!")
            toast.error("Add unsuccessful!!")
            return;
        } else {
            let currentSinhVien = sinhVien;
            currentSinhVien.push(nSinhVien)

            setShow(false)
            setSinhVien(currentSinhVien)

            toast.success("Add Successfully !!")
        }

    }

    const handleChecked = (maSV) => {
        setSinhVien(sinhVien.map(item => {
            if (item.maSV === maSV) {
                item.checked = !item.checked
            }
            console.log(!item.checked);
            return item;
        }))
    }

    const handleDeleteChecked = () => {
        let text = "Bạn có chắc chắn muốn xóa những sinh viên này không ?";
        if (window.confirm(text) === true) {
            let currentSinhVien = sinhVien;

            currentSinhVien = currentSinhVien.filter(item => !item.checked)
            setSinhVien(currentSinhVien)

            toast.success("Delete Successfully !!")
        } else {
            return;
        }


    }

    const handleOnChangeTenSV = (event) => {
        let editSinhVienCopy = { ...editSinhVien };
        editSinhVienCopy.tenSV = event.target.value
        setEditSinhVien(editSinhVienCopy)
    }


    const handleOnChangeNgaySinh = (event) => {
        let editSinhVienCopy = { ...editSinhVien };
        editSinhVienCopy.ngaySinh = event.target.value
        setEditSinhVien(editSinhVienCopy)
    }

    const handleOnChangeGioiTinh = (event) => {
        let editSinhVienCopy = { ...editSinhVien };
        editSinhVienCopy.gioiTinh = event.target.value
        setEditSinhVien(editSinhVienCopy)
    }

    const handleOnChangeKhoa = (event) => {
        let editSinhVienCopy = { ...editSinhVien };
        editSinhVienCopy.khoa = event.target.value
        setEditSinhVien(editSinhVienCopy)
    }


    let isEmptyObj = Object.keys(editSinhVien).length === 0
    const handleEdit = (sinhvienEdit) => {
        if (isEmptyObj === false && editSinhVien.maSV === sinhvienEdit.maSV) {
            let sinhVienCopy = [...sinhVien];
            console.log("sinh vien coppo", sinhVienCopy);
            let objIndex = sinhVienCopy.findIndex((item => item.maSV === sinhvienEdit.maSV));

            sinhVienCopy[objIndex].maSV = editSinhVien.maSV
            sinhVienCopy[objIndex].tenSV = editSinhVien.tenSV
            sinhVienCopy[objIndex].ngaySinh = editSinhVien.ngaySinh
            sinhVienCopy[objIndex].gioiTinh = editSinhVien.gioiTinh
            sinhVienCopy[objIndex].khoa = editSinhVien.khoa

            setSinhVien(sinhVienCopy)
            setEditSinhVien("")

            toast.success("Edit Successfully !!")
            return;
        }

        setEditSinhVien(sinhvienEdit)
    }

    const handleInputSeach = (event) => {
        let currentSinhVien = sinhVien;
        currentSinhVien = currentSinhVien.filter(item =>
            item.tenSV.toUpperCase().includes(event.target.value.toUpperCase())
        )

        setSeachSinhVien(currentSinhVien)
    }

    const handleButtonSeach = () => {
        if (!seachSinhVien) {
            alert("Nhập từ khóa tìm kiếm")
            return;
        }
        setSinhVien(seachSinhVien)
    }

    const handleEnter = (event) => {
        if (event.keyCode === 13) {
            handleButtonSeach();
        }
    }


    return (

        <>
            <div className="top1">
                <label>Từ khóa: </label>
                <input
                    type="text"
                    onChange={(event) => { handleInputSeach(event) }}
                    onKeyDown={handleEnter}
                    placeholder="Tìm kiếm...."
                />
                <button onClick={() => handleButtonSeach()}>Tìm kiếm</button>

            </div>
            <div className='top2'>
                <button onClick={handleShow}><FontAwesomeIcon icon={faUserPlus} /></button>
                <button onClick={() => handleDeleteChecked()}><FontAwesomeIcon icon={faUsersSlash} /></button>
            </div>

            <div className='Modals'>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm sinh viên</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{<AddSV handleAddSV={handleAddSV} />}</Modal.Body>
                </Modal>
            </div>

            <div className='DisplayArea-container'>

                <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Mã SV</td>
                            <td>Tên sinh viên</td>
                            <td>Ngày sinh</td>
                            <td>Giới tính</td>
                            <td>Khoa</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {sinhVien.map(item => {
                            return (
                                <tr key={item.maSV}>
                                    {isEmptyObj === true ?
                                        <>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    value={item.maSV}
                                                    // checked={item.checked}
                                                    onChange={() => { handleChecked(item.maSV) }}
                                                />
                                            </td>

                                            <td>{item.maSV}</td>
                                            <td>{item.tenSV}</td>
                                            <td>{item.ngaySinh}</td>
                                            <td>{item.gioiTinh}</td>
                                            <td>{item.khoa}</td>
                                        </>
                                        :
                                        <>
                                            {editSinhVien.maSV === item.maSV ?

                                                <>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={item.maSV}
                                                            checked={item.checked}
                                                            onChange={() => { handleChecked(item.maSV) }}
                                                        />
                                                    </td>

                                                    <td>{item.maSV}</td>

                                                    <td>
                                                        <input
                                                            type='text'
                                                            value={editSinhVien.tenSV}
                                                            onChange={(event) => handleOnChangeTenSV(event)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type='date'
                                                            value={editSinhVien.ngaySinh}
                                                            onChange={(event) => handleOnChangeNgaySinh(event)}
                                                        />

                                                    </td>
                                                    <td>
                                                        <input
                                                            type="radio"
                                                            value="Nam"
                                                            name="gender"
                                                            onChange={(event) => handleOnChangeGioiTinh(event)}
                                                        /> Nam
                                                        <input
                                                            type="radio"
                                                            value="Nữ"
                                                            name="gender"
                                                            onChange={(event) => handleOnChangeGioiTinh(event)}
                                                        /> Nữ
                                                    </td>
                                                    <td>
                                                        <select value={item.khoa} onChange={(event) => handleOnChangeKhoa(event)}>
                                                            <option value={'Toán'}>Toán</option>
                                                            <option value={'Lý'}>Lý</option>
                                                            <option value={'Hóa'}>Hóa</option>
                                                            <option value={'Anh'}>Anh</option>
                                                            <option value={'Văn'}>Văn</option>
                                                            <option value={'Sử'}>Sử</option>
                                                            <option value={'Địa'}>Địa</option>
                                                        </select>
                                                    </td>

                                                </>
                                                :
                                                <>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={item.maSV}
                                                            checked={item.checked}
                                                            onChange={() => { handleChecked(item.maSV) }}
                                                        />
                                                    </td>
                                                    <td>{item.maSV}</td>
                                                    <td>{item.tenSV}</td>
                                                    <td>{item.ngaySinh}</td>
                                                    <td>{item.gioiTinh}</td>
                                                    <td>{item.khoa}</td>

                                                </>
                                            }

                                        </>

                                    }
                                    <td>
                                        <button onClick={() => handleEdit(item)}>
                                            {isEmptyObj === false && editSinhVien.maSV === item.maSV ? 'Save' : 'Edit'}
                                        </button>
                                        <button onClick={() => handleDelete(item.maSV)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody >
                </table>
            </div >
        </>

    )
}
export default DisplayArea;