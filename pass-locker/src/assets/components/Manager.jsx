import React from 'react'
import Logo from './Logo'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {

    const ref = useRef()
    const passref = useRef()
    const [form, setform] = useState({ Site: "", User: "", Password: "" })
    const [passwordarray, setpasswordarray] = useState([])

    const getPassword = async () => {
        const req = await fetch("http://localhost:3000/")
        const Passwords = await req.json()
        console.log(Passwords, "jj")
        setpasswordarray(Passwords)
    }

    useEffect(() => {
        getPassword()
    }, [])


    const showPassword = () => {
        //passref.current.type = "text"
        const path = 'http://localhost:5173/'
        if (ref.current.src === path + 'eye.svg') {
            ref.current.src = path + 'eye-slash.svg'
            passref.current.type = "password"
        }
        else {
            ref.current.src = path + 'eye.svg'
            passref.current.type = "text"
        }
    }

    const handleSubmit = async () => {

        // await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({  Id :form._id }) })

        setpasswordarray([...passwordarray, { ...form, Id: uuidv4() }])
        await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, Id: uuidv4() }) })

        toast('Saved Successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: 'Bounce',
            });
            

        console.log(form);
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value, Id: uuidv4() })
    }

    const deletePassword = async (Id) => {
        setpasswordarray(passwordarray.filter(item => { return item.Id !== Id }))
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ Id: Id }) })

        toast('Deleted Successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: 'Bounce',
            });
    }

    const editPassword = async (Id) => {
        setform({ ...passwordarray.filter(item => { return item.Id === Id })[0], Id: Id })

        setpasswordarray(passwordarray.filter(item => { return item.Id !== Id }))
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ Id: Id }) })
        
        
    }

    const copyText = (data) => {
        toast('Copied Successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: 'Bounce',
            });
        navigator.clipboard.writeText(data)
    }


    return (
        <>

            <div className='bg-gradient-to-b from-white from-25% to-[#63e] to-75% w-full h-full'>
                <div className="md:container min-h-[89.25vh] md:py-8 md:px-40  text-black   md:mx-auto  ">
                    <div className='bg-purple-100 py-6 '>
                        <div className='flex justify-center text-black mb-2'> <Logo /> </div>
                        <p className='text-center'>manage your passwords with ease</p>
                        <div className='flex flex-col justify-center p-4 font-sans '>
                            <input onChange={handleChange} name='Site' value={form.Site} className='rounded-full my-3 py-1 md:px-5 px-3.5 border-purple-700 border-[2px] outline-none' placeholder='Enter Website URL' type='url'></input>
                            <div className='flex gap-6'>
                                <div className=' w-full'><input name='User' value={form.User} onChange={handleChange} className='rounded-full my-3 py-1 md:px-5 px-3.5 w-full border-purple-700 border-[2px] outline-none' placeholder='Enter Username' type='text'></input></div>
                                <div className=' relative w-full'><input name='Password' ref={passref} value={form.Password} onChange={handleChange} className='rounded-full my-3 py-1 md:pl-5 md:pr-9 pl-3.5 pr-9  w-full border-purple-700 border-[2px] outline-none' placeholder='Enter Password' type='password'></input>
                                    <span onClick={showPassword} className=' absolute z-10 right-3  top-5'> <img ref={ref} width={20} src='.\eye-slash.svg' alt='' name='show'></img></span></div>
                            </div>
                        </div>
                        <div className='flex justify-center font-semibold'>
                            <button onClick={handleSubmit} className='flex items-center gap-1.5 w-fit bg-purple-600 hover:bg-purple-500 rounded-3xl px-4 py-1.5'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                                    trigger="hover">
                                </lord-icon>
                                <span>Save</span>
                            </button>
                        </div>
                        <div className=' md:px-8 px-4 py-3'>
                            <h1 className='text-2xl font-semibold py-3 my-2'>Your Passwords</h1>
                            <div >
                                {passwordarray.length == 0 && <div>No Passwords to show ! </div>}
                                {passwordarray.length != 0 && <table class="table-auto bg-purple-200 w-full rounded-lg overflow-hidden">
                                    <thead className=' bg-purple-800'>
                                        <tr>
                                            <th className=' text-[14px] max-w-[31%]  py-2.5'>Site</th>
                                            <th className=' text-[14px] max-w-[26%]  py-2.5'>Username</th>
                                            <th className=' text-[14px] max-w-[26%]  py-2.5'>Password</th>
                                            <th className=' text-[14px] max-w-[17%]  py-2.5'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            passwordarray.map(item =>

                                                <tr key={item.Id}>
                                                    <td className='py-2  px-1 md:text-[16px] text-[14px]  max-w-[35%]'>
                                                        <div className='flex items-center justify-center break-all   '>
                                                            <div className='flex items-center gap-2 cursor-pointer' onClick={() => { copyText(item.Site) }}>
                                                                <span><a className='hover:text-blue-600 hover:underline decoration-blue-600 ' href={item.Site} target='_blank'>{item.Site}</a></span>

                                                                <span className='mt-1'><lord-icon
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover"
                                                                    style={{ width: "20px", height: "20px", marginTop: "6px" }}>
                                                                </lord-icon></span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 px-1 md:text-[16px] text-[14px]  max-w-[24%] '>
                                                        <div className='flex items-center justify-center break-all '>
                                                            <div className='flex items-center gap-2 cursor-pointer' onClick={() => { copyText(item.User) }}>
                                                                <span>{item.User}</span>
                                                                <span className=' mt-1'><lord-icon
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover"
                                                                    style={{ width: "20px", height: "20px", marginTop: "6px" }}>
                                                                </lord-icon></span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 px-1  md:text-[16px] text-[14px] max-w-[24%]'>
                                                        <div className='flex items-center justify-center break-all '>
                                                            <div className='flex items-center gap-2 cursor-pointer' onClick={() => { copyText(item.Password) }}>
                                                                <span>{"*".repeat(item.Password.length)}</span>
                                                                <span className=' mt-2'><lord-icon
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover"
                                                                    style={{ width: "20px", height: "20px", marginTop: "6px" }}>
                                                                </lord-icon></span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 px-1  md:text-[16px] text-[14px] max-w-[17%]' >
                                                        <div className='flex items-center justify-center '>
                                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.Id) }}>
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                                    trigger="hover"
                                                                    style={{ "width": "25px", "height": "25px" }}>
                                                                </lord-icon>
                                                            </span>
                                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.Id) }}>
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                                    trigger="hover"
                                                                    style={{ "width": "25px", "height": "25px" }}>
                                                                </lord-icon>
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                }
                                {/* <button onClick={handleDelete} className={passwordarray.length!=0?` opacity-100 bg-red-700`:` opacity-0  `} >delete</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Manager