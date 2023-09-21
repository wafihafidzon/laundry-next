import Sidebar from '@/components/Sidebar';
import useGetOutlet from '@/controller/outlet/useGetOutlet';
import FormInput from '@/components/outlet/OutletInput';
import { FaTrash } from 'react-icons/fa';
import { PiPencilLineFill } from 'react-icons/pi';
import useDeleteOutlet from '@/controller/outlet/useDeleteOutlet';
import { useState } from 'react';


const Outlet = () => {
  const { data: fetchOutlet, isLoading, refetch } = useGetOutlet();
  const [editData, setEditData] = useState(null);
  const [isFormInputVisible, setIsFormInputVisible] = useState(false);
  const { mutate: deleteOutlet } = useDeleteOutlet({
    onSuccess: () => {
      refetch();
    },
  });

  const handleEdit = (dataEdit) => {
    setIsFormInputVisible(true);
    setEditData(dataEdit);
  };

  const handleModalClose = () => {
    setIsFormInputVisible(false);
    setEditData(null);
  };

  const renderProduct = () => {
    console.log(fetchOutlet);
    return fetchOutlet?.data.map((item, index) => {
      return (
        <tr
          key={index + 1}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th scope="row" className="text-center px-6 py-4">
            {index + 1}
          </th>
          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {item.nama}
          </td>
          <td className="px-6 py-4">{item.alamat}</td>
          <td className="px-6 py-4">{item.telpon}</td>
          <td className="px-6 py-4 text-center">
            <button
              onClick={() => deleteOutlet(item.id)}
              className="btn btn-error m-1"
            >
              <FaTrash />
            </button>
            <button onClick={() => handleEdit(item)} className="btn btn-info m-1">
              <PiPencilLineFill />
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <Sidebar>
        <button className="btn btn-success mb-6" onClick={() => handleEdit()}>
          add new
        </button>
        {isFormInputVisible && (
          <FormInput
            isFormInputVisible={isFormInputVisible}
            handleModalClose={handleModalClose}
            initialData={editData}
          />
        )}
        <div className="relative overflow-x-auto rounded-lg">
          {isLoading && (
            <span className="loading loading-infinity loading-md"></span>
          )}
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="w-10 px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama outlet
                </th>
                <th scope="col" className="px-6 py-3">
                  alamat outlet
                </th>
                <th scope="col" className="w-52 px-6 py-3">
                  telpon outlet
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  action
                </th>
              </tr>
            </thead>
            <tbody>{renderProduct()}</tbody>
          </table>
        </div>
      </Sidebar>
    </>
  );
};

export default Outlet;
