import './App.css';
import {useState} from "react";

function Seat({rowInfo, colInfo, studentList}) {
    studentList = [...studentList]

    function getNextStudent(i, j) {
        // return ''
        console.log(studentList);
        if ((j % 2) || studentList.length === 0) return '';
        return studentList.shift();
    }

    return (
        <div>{
            rowInfo.map((row, index) => {
                return (
                    <div className='flex flex-row'>{
                        colInfo.map((col, index) =>
                            <table className='m-2'>{
                                [...Array(row)].map((e, i) => (
                                    <tr>{
                                        [...Array(col)].map((e, j) => (
                                            <td className='border border-black h-10 w-36 text-xs'>
                                                <div className='flex flex-col items-center'>{getNextStudent(i, j)}</div>
                                            </td>))
                                    }</tr>
                                ))
                            }</table>
                        )
                    }</div>
                )
            })
        }</div>
    )
}

function Result({classrooms}) {
    return (
        <div className='flex flex-col items-center p-8'>{
            classrooms.map((classroom, index) =>
                <>
                    <div className='flex flex-col items-center text-2xl font-bold my-2'>{classroom.title}</div>
                    <div className='border border-black w-80 flex flex-col items-center my-2'>前方白板</div>
                    <Seat rowInfo={classroom.rowInfo} colInfo={classroom.colInfo} studentList={classroom.studentList}/>
                    <div className='break-before-page'></div>
                </>
            )
        }</div>
    );
}

function Input({classrooms, setClassrooms}) {
    const [title, setTitle] = useState('');
    const [rowInfo, setRowInfo] = useState('');
    const [colInfo, setColInfo] = useState('');
    const [studentList, setStudentList] = useState('');

    function isInputValid() {
        if (title === '') {
            alert('請輸入教室名稱');
            return false;
        }
        if (rowInfo === '' || rowInfo.split(' ').map(x => parseInt(x)).reduce((a, b) => a + b, 0) === 0) {
            alert('請輸入列數');
            return false;
        }
        if (colInfo === '' || colInfo.split(' ').map(x => parseInt(x)).reduce((a, b) => a + b, 0) === 0) {
            alert('請輸入行數');
            return false;
        }
        return true;
    }

    function addClassroom() {
        if (!isInputValid()) return;
        setClassrooms([...classrooms, {
            title: title,
            rowInfo: rowInfo.split(' ').map(x => parseInt(x)),
            colInfo: colInfo.split(' ').map(x => parseInt(x)),
            studentList: studentList.split('\n')
        }])
        setTitle('');
        setRowInfo('');
        setColInfo('');
        setStudentList('');
    }

    return (
        <div className='flex flex-col items-center p-8'>
            <div className='flex flex-col'>
                <div className='flex flex-row'>
                    <div className='w-80 h-10 text-xl font-bold my-2'>教室名稱</div>
                    <input className='border border-black w-80 h-10 text-xl font-bold my-2' value={title}
                           onChange={e => setTitle(e.target.value)}
                            placeholder='326 教室'
                    />
                </div>
                <div className='flex flex-row'>
                    <div className='w-80 h-10 text-xl font-bold my-2'>列資訊</div>
                    <input className='border border-black w-80 h-10 text-xl font-bold my-2' value={rowInfo}
                            onChange={e => setRowInfo(e.target.value)}
                           placeholder='3 3 2'
                    />
                </div>
                <div className='flex flex-row'>
                    <div className='w-80 h-10 text-xl font-bold my-2'>行資訊</div>
                    <input className='border border-black w-80 h-10 text-xl font-bold my-2' value={colInfo}
                            onChange={e => setColInfo(e.target.value)}
                           placeholder='1 2 2 2'
                    />
                </div>
                <div className='flex flex-row'>
                    <div className='w-80 h-10 text-xl font-bold my-2'>學生名單</div>
                    <textarea className='border border-black w-80 h-10 text-xl font-bold my-2' value={studentList}
                              onChange={e => setStudentList(e.target.value)}
                              placeholder={'同股呵人  111000111\n同估喝人  111000123\n同股喝人  111000333\n'}
                    />
                </div>
            </div>
            <button className='border border-black w-80 h-10 text-xl font-bold my-2' onClick={addClassroom}>
                新增
            </button>
        </div>
    )
}

function App() {
    const [classrooms, setClassrooms] = useState([]);

    return (
        <div className='flex flex-col items-center'>
            <Result classrooms={classrooms}/>
            <div className='print:hidden'>
                <Input classrooms={classrooms} setClassrooms={setClassrooms}/>
            </div>
        </div>
    )
}

export default App;
