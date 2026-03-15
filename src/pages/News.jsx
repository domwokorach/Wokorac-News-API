import React, { useCallback, useEffect, useState } from 'react'
import NewsCard from '../components/NewsCard';
import { Loader2 } from 'lucide-react';
import { fetchTopHeadlines } from '../api/newsApi';

const News = ({ country, category, articles, setArticles }) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchAllNews = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await fetchTopHeadlines({ country, category });

            setArticles(data.articles || []);
            console.log(data.articles);


        } catch (error) {
            console.error('Failed to fetch news:', error);
            setError(error.message || String(error));

        } finally{
            setLoading(false)
        }
    }, [country, category, setArticles])

    useEffect(() => {
        fetchAllNews()
    }, [fetchAllNews])
    return (
        <>
            {
                loading ? <div className='bg-gray-200 dark:bg-gray-800 h-screen flex flex-col gap-3 items-center justify-center'>
                    <Loader2 className='h-12 w-12 animate-spin dark:text-gray-200' />
                    <h1 className='text-gray-800 text-xl font-semibold dark:text-gray-200'>Loading...</h1>
                </div> : error ? <div className='bg-gray-200 dark:bg-gray-800 h-screen flex flex-col gap-3 items-center justify-center p-4'>
                    <div className='max-w-2xl bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-6'>
                        <h1 className='text-red-800 dark:text-red-200 text-2xl font-bold mb-4'>⚠️ Failed to load news</h1>
                        <p className='text-red-700 dark:text-red-300 font-mono text-sm whitespace-pre-wrap break-all'>{error}</p>
                        <button 
                            onClick={fetchAllNews}
                            className='mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold'
                        >
                            Retry
                        </button>
                    </div>
                </div> :
                    <div className='bg-gray-200 dark:bg-gray-800 py-24 px-4 md:px-0'>
                        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-7'>
                            {
                                articles.map((article, index) => {
                                    return <NewsCard key={index} article={article} />
                                })
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default News
