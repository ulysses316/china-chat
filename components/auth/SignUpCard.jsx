'use client'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function SignUpCard() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Necesitas proporcionar un email valido").required("Este campo es necesario"),
      password: Yup.string().required("Este campo es necesario."),
      name: Yup.string().required("Este campo es necesario.")
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/signup`, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            name: values.name
          })
        })

        const data = await res.json();

        if (res.ok) {
          router.push("/auth/signin")
        }

        if (!res.ok) {
          formik.errors.general = data.error;
          formik.touched.general = true;
        }

      } catch (error) {
        console.error(error);
        formik.errors.general = error;
        formik.touched.general = true;
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className='border-highlighter border text-white h-auto py-8 w-96 rounded-md bg-fondo flex justify-center items-center flex-col px-4'>
      <div className='flex justify-center text-3xl'>
        <Image src={"/logo.png"} width={200} height={200} alt="Logo de la app" />
      </div>

      {/* Error General */}
      {formik.errors.general && formik.touched.general ? (
        <div className='bg-red-200 text-red-500 px-2 py-1 rounded-md w-full'>
          <p>{formik.errors.general}</p>
        </div>
      ) : null}
      {/* Error General */}

      <div className='flex flex-col justify-center gap-2 py-2 w-full'>
        {formik.errors.name && formik.touched.name ? (
          <div className='bg-red-200 text-red-500 px-2 py-1 rounded-md'>
            <p>{formik.errors.name}</p>
          </div>
        ) : null}
        <label className='font-bold'>Nombre</label>
        <input className='rounded-md border border-highlighter outline-none bg-transparent text-white py-1 px-2' type="text" name='name' onChange={formik.handleChange} />
      </div>
      <div className='flex flex-col justify-center gap-2 py-1 w-full'>
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
        <button className='text-white bg-highlighter font-bold px-2 py-2 rounded-md' type='submit'>Crear cuenta</button>
      </div>
    </form>
  )
}
