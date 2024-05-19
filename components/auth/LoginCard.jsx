'use client'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

export default function LoginCard() {
  const user = useSession()
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Necesitas proporcionar un email valido").required("Este campo es necesario"),
      password: Yup.string().required("Este campo es necesario.")
    }),
    onSubmit: async (values) => {
      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false
        })

        if (res.ok) {
          router.push("/")
        }

        console.log(res);

        if (res.status === 401) {
          formik.errors.general = res.error;
          formik.touched.general = true;
        }
      } catch (error) {
        formik.errors.general = error;
        formik.touched.general = true;
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className='border-highlighter border text-white h-auto py-8 sm:w-96 w-80 rounded-md bg-fondo flex justify-center items-center flex-col px-4'>
      <div className='flex flex-col justify-center gap-2 py-1 w-full'>
        <div className='flex justify-center text-3xl'>
          <Image src={"/logo.png"} width={200} height={200} />
        </div>

        {/* Error General */}
        {formik.errors.general && formik.touched.general ? (
          <div className='bg-red-200 text-red-500 px-2 py-1 rounded-md w-full'>
            <p>{formik.errors.general}</p>
          </div>
        ) : null}
        {/* Error General */}

        {formik.errors.email && formik.touched.email ? (
          <div className='bg-red-200 text-red-500 px-2 py-2 rounded-md'>
            <p>{formik.errors.email}</p>
          </div>
        ) : null}
        <label className='font-bold'>Email</label>
        <input className='rounded-md border border-highlighter outline-none bg-transparent text-white py-1 px-2' type="text" name='email' onChange={formik.handleChange} />
      </div>
      <div className='flex flex-col justify-center gap-2 py-2 w-full'>
        {formik.errors.password && formik.touched.password ? (
          <div className='bg-red-200 text-red-500 px-2 py-1 rounded-md'>
            <p>{formik.errors.password}</p>
          </div>
        ) : null}
        <label className='font-bold'>Contraseña</label>
        <input className='rounded-md border border-highlighter outline-none bg-transparent text-white py-1 px-2' type="password" name='password' onChange={formik.handleChange} />
      </div>
      <div className='flex justify-center pt-4'>
        <button className='text-white bg-highlighter font-bold px-2 py-2 rounded-md' type='submit'>Iniciar sesion</button>
      </div>
    </form>
  )
}
