import React, { useEffect, useState } from 'react';
import { LeftSidebar, Loading, Navbar, RightSidebar } from '../../components';
import { GetProducts } from '../../services/Services';
import { Products } from './Products';

export const ProductsLayout = () => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");

    const [detailSearch, setDetailSearch] = useState({
        sortType: 0,
        brands: [],
        models: [],
    });

    const getProducts = async () => {

        setLoading(loading => true);

        const result = await GetProducts();

        if (result) {
            setData(result)
        } else {
            console.log("Products could not be loaded!");
        }
        setLoading(loading => false);
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
        getProducts();
    }, [])

    return (
        <div className='w-full'>
            <div className='pb-10'>
                <Navbar setSearchInput={setSearchInput} />
                <div className='flex flex-col md:flex-row text-base-text justify-between px-5 gap-5 mt-[62px] pt-4 max-w-7xl mx-auto'>
                    {loading && (
                        <Loading />
                    )}

                    {
                        !loading && (

                            <>
                                <div className='flex flex-col md:items-end w-[200px] mx-auto md:w-[17%] min-w-[200px]'>
                                    <LeftSidebar
                                        data={data}
                                        detailSearch={detailSearch}
                                        setDetailSearch={setDetailSearch}
                                    />
                                </div>
                                <div className='flex-1'>
                                    <Products
                                        searchInput={searchInput}
                                        detailSearch={detailSearch}
                                        data={data}
                                        setData={setData}
                                        setLoading={setLoading}
                                    />
                                </div>

                                <div className='flex flex-col md:items-end w-[200px] mx-auto md:w-[17%] min-w-[200px]'>
                                    <RightSidebar />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}