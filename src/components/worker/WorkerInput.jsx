import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
// import usePostOutlet from '@/controller/outlet/usePostOutlet';
import useUpdateOutlet from '@/controller/outlet/useUpdateOutlet';
import useGetWorker from '@/controller/worker/useGetWorker';
import usePostWorker from '@/controller/worker/usePostWorker';
import useGetOutlet from '@/controller/outlet/useGetOutlet';
import { useQuery } from '@tanstack/react-query';

export default function FormInput({
  isFormInputVisible,
  handleModalClose,
  initialData,
}) {
  const [isOpen, setIsOpen] = useState(false);
  // const { refetch } = useGetWorker();
  const { data } = useQuery({
    queryFn: async () => {
      const res = await axiosInstance.get('/outlet');
      console.log(res)
      return res;
    }
  })

  useEffect(() => {
    if (isFormInputVisible === true) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isFormInputVisible]);

  const formik = useFormik({
    initialValues: {
      nama: initialData?.nama || '',
      username: initialData?.username || '',
      outlet: initialData?.outlet || '',
      role: initialData?.role || '',
      id: initialData?.id,
    },
    onSubmit: () => {
      const { nama, username, outlet, role, id } = formik.values;

      if (id) {
        updateData({ nama, username, outlet: parseInt(outlet), role, id });
      } else {
        inputData({ nama, username, outlet: parseInt(outlet), role, });
      }
      formik.resetForm();
    },
  });

  const handleFormValue = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const { mutate: inputData } = usePostWorker({
    onSuccess: () => {
      handleModalClose();
      refetch();
    },
  });

  const { mutate: updateData } = useUpdateOutlet({
    onSuccess: () => {
      handleModalClose();
      refetch();
    },
  });

  const outletList = () => {
    // console.log(data); 
    return data?.data.data.map((item, index) => {
      return (
        <option key={index + 1} value={item.id}>
          {item.outlet.nama}
        </option>
      );
    });
  }

  return (
    <>
      <dialog id="my_modal_1" className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Worker</h3>
          <div className="modal-action">
            <form
              method="post"
              className="form-control w-full"
              onSubmit={formik.handleSubmit}
            >
              <label htmlFor="" className="label">
                Nama Pekerja
              </label>
              <input
                value={formik.values.nama}
                onChange={handleFormValue}
                name="nama"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full mb-3"
              />
              <label htmlFor="" className="label">
                Userename Pekerja
              </label>
              <input
                value={formik.values.alamat}
                onChange={handleFormValue}
                name="username"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full mb-3"
              />
              <label htmlFor="" className="label">
                Penempatan Outlet
              </label>
              <select className="select select-bordered w-full mb-6" name='outlet'>
                <option disabled selected hidden>
                  Pick the best JS framework
                </option>
                {outletList()}
              </select>
              <label htmlFor="" className="label">
                Role
              </label>
              <select className="select select-bordered w-full mb-6" name='role'>
                <option disabled selected hidden>
                  Pilih role
                </option>
                <option>Admin</option>
                <option>Kasir</option>
                <option>Owner</option>
              </select>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleModalClose}
            >
              ✕
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
