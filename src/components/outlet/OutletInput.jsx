import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import usePostOutlet from '@/controller/outlet/usePostOutlet';
import useGetOutlet from '@/controller/outlet/useGetOutlet';
import useUpdateOutlet from '@/controller/outlet/useUpdateOutlet';

export default function OutletInput({
  isFormInputVisible,
  handleModalClose,
  initialData,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { refetch } = useGetOutlet();

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
      alamat: initialData?.alamat || '',
      telpon: initialData?.telpon || '',
      id: initialData?.id,
    },
    onSubmit: () => {
      const { nama, alamat, telpon, id } = formik.values;

      if (id) {
        updateData({ nama, alamat, telpon: parseInt(telpon), id });
      } else {
        inputData({ nama, alamat, telpon: parseInt(telpon) });
      }
      formik.resetForm();
    },
  });

  const handleFormValue = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const { mutate: inputData } = usePostOutlet({
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

  return (
    <>
      <dialog id="my_modal_1" className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Outlet</h3>
          <div className="modal-action">
            <form
              method="post"
              className="form-control w-full"
              onSubmit={formik.handleSubmit}
            >
              <label htmlFor="" className="label">
                Nama Outlet
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
                Alamat Outlet
              </label>
              <input
                value={formik.values.alamat}
                onChange={handleFormValue}
                name="alamat"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full mb-3"
              />
              <label htmlFor="" className="label">
                Telpon Outlet
              </label>
              <input
                value={formik.values.telpon}
                onChange={handleFormValue}
                name="telpon"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full mb-6"
              />
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
