import { useEffect, useState } from 'react';
import BodySection from '../../../components/BodySection';
import HeaderSection from '../../../components/HeaderSection';
import { InputSearch } from '../../../components/Input';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import DataTable, { DataTableColumnInterface, DataTableColumnTypes } from '../../../components/DataTable';
import { FaPlus } from 'react-icons/fa';
import { Customer, initialCustomer } from '../../../interfaces';
import CreateCustomer from './windows/CreateCustomer';
import UpdateCustomer from './windows/UpdateCustomer';


const columns: DataTableColumnInterface<Customer>[] = [
    { name: 'CODIGO', type: DataTableColumnTypes.P, key: "code" },
    { name: 'NOMBRE', type: DataTableColumnTypes.P, key: "name" },
    { name: 'APELLIDO', type: DataTableColumnTypes.P, key: "lasName" }
];

export default function Customers() {

    const { customers } = useSelector((s: RootState) => s.Sales);

    const [filter, setFilter] = useState<{ search: string }>({ search: '' });
    const [openCreateCustomer, setOpenCreateCustomer] = useState(false);
    const [openUpdateCustomer, setOpenUpdateCustomer] = useState(false);

    const [selectedCustomer, setSelectedCustomer] = useState<Customer>(initialCustomer);
    const [filteredCustomer, setFilteredCustomer] = useState<Customer[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        const newFilter = { ...filter, [name]: value };
        const newData = customers.filter(i => i.name.toLowerCase().includes(newFilter.search.toLowerCase()) || i.code.includes(newFilter.search));

        setFilteredCustomer([...newData]);
        setFilter(newFilter);
    }

    const getCustomer = (d: Customer) => {
        setSelectedCustomer(d);
        setOpenUpdateCustomer(true);
    }

    useEffect(() => {
        setFilteredCustomer(customers);
    }, [customers])
    return (
        <>
            {openCreateCustomer && <CreateCustomer closeButton={() => { setOpenCreateCustomer(false) }} />}
            {openUpdateCustomer && <UpdateCustomer closeButton={() => { setOpenUpdateCustomer(false) }} customer={selectedCustomer} />}
            <HeaderSection>
                <InputSearch
                    handleInputChange={handleChange}
                    name='search'
                    placeholder="Buscar"
                    value={filter.search}
                />
            </HeaderSection>
            <BodySection>
                <DataTable<Customer> columns={columns} data={filteredCustomer} details={{ name: 'MAS', action: getCustomer }} />
                <button
                    onClick={() => { setOpenCreateCustomer(true) }}
                    type="button"
                    className="absolute bottom-2 right-2 flex justify-center items-center bg-primary bg-opacity-80 text-white text-[22px] hover:bg-opacity-100 w-14 h-14 rounded-full"
                >
                    <FaPlus />
                </button>
            </BodySection>
        </>
    );
}