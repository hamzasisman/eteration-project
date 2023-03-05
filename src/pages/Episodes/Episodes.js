import React, { useEffect, useState } from 'react'
import { GetEpisodes } from '../../services/Services';
import { EpisodesTable } from './EpisodesTable';
import { Pagination, Search } from '../../components';

export const Episodes = () => {

    const [data, setData] = useState(null)
    const limit = parseInt(process.env.REACT_APP_TABLE_ROW_LIMIT);
    const [loading, setLoading] = useState(true);
    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecord, setTotalRecord] = useState(0);
    const [searchInput, setSearchInput] = useState("");

    const getEpisodes = async () => {

        console.log(totalRecord);

        const result = await GetEpisodes();

        if (result) {
            setData(result)
            setTotalRecord(totalRecord => result && result.length);
            setLoading(loading => false);
        } else {
            console.log("Bölümler yüklenemedi!");
        }
    }

    useEffect(() => {
        getEpisodes()
    }, [])

    //sayfa değiştikçe bilgileri yeniden çağırıyoruz
    useEffect(() => {
        if (totalRecord !== 0) {
            getEpisodes();
        }
    }, [start])

    //Arama verileri değiştiğinde değerleri sıfırlıyoruz
    const resetValue = () => {
        setStart(start => 0);
        setCurrentPage(currentPage => 1);
    }

    // Data'dan pagination'a göre listelenecek aralığı filtreliyoruz
    let filteredData = [];
    if (data) {
        filteredData = data.filter((data) => (
            data.id > start && data.id <= start + limit
        ))
    }

    const searchedData = filteredData.filter(
        (item) =>
            item.episode.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.url.toLowerCase().includes(searchInput.toLowerCase())
    );


    useEffect(() => {
        setTotalRecord(searchedData.length)
    })

    return (
        <div className='mb-7'>
            <Search
                placeholder="Aramak için veri giriniz"
                classname="mt-5"
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <EpisodesTable data={searchedData} />
            {data &&
                <Pagination
                    totalCount={totalRecord}
                    limit={limit}
                    start={start}
                    setStart={setStart}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setLoading={setLoading}
                />
            }
        </div>
    )
}