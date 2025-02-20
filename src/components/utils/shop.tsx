import React from 'react'


type PromoLabel = {
    icon: React.JSX.Element
    label: string
}
type TovarProps = {
    src: string
    label: string 
    price: number
    hot: string
    rating: {
        total: number 
        rating: number
    }
    promo: PromoLabel[]
}

export function Cart({ tovarData }: {tovarData: TovarProps}) {
    const addFavorite =()=> {
        console.log('add favorite')
    }
    const addBasket =()=> {
        console.log('add basket')
    }

    const oneBlocs =(hot: string)=> (
        <div className="mb-4 flex items-center justify-between gap-4">
            { hot &&
                <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                    { hot }
                </span>
            }

            <div className="flex items-center justify-end gap-1">
                <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                        <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>
                <button onClick={addFavorite} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only"> 
                        Add to Favorites 
                    </span>
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
    const stars =(activ: boolean)=> (
        <svg className={`h-4 w-4 text-${activ?'yellow-400':'gray-400'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
        </svg>
    );
    const ratings =(total: number, rating: number)=> {
        const content = [false,false,false,false,false].map((e, index)=>
            index < Math.round(rating / 100) && true
        );

        return(
            <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                    { content.map((elem, index)=> 
                        <React.Fragment key={index}>
                            { stars(elem) }
                        </React.Fragment>
                    )}
                </div>

                <p className="text-sm font-medium text-gray-900 dark:text-white">
                    { rating / 100 }
                </p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    ({ total })
                </p>
            </div>
        );
    }
    const promoLabel =(promo: PromoLabel[])=> (
        <ul className="mt-2 flex items-center gap-4">
            <li className="flex items-center gap-2">
                { promo.map((elem, index)=> 
                    <React.Fragment key={index}>
                        <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24">
                            { elem.icon }
                        </svg>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            { elem.label }
                        </p>
                    </React.Fragment>
                    
                )}
            </li>
        </ul>
    );

    
    return (
        <div className="rounded-lg border border-gray-700 bg-gray-600 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="h-56 w-full">
                <img className="mx-auto h-full dark:hidden" 
                    src={gurl + tovarData.src}
                    alt={tovarData.label} 
                />
            </div>
            <div className="pt-6">
                { oneBlocs(tovarData.hot) }

                <div className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                    { tovarData.label }
                </div>

                { ratings(tovarData.rating.total, tovarData.rating.rating) }
                { promoLabel(tovarData.promo) }
                

                <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="text-2xl font-extrabold leading-tight text-gray-900">
                        ${ tovarData.price }
                    </p>

                    <button onClick={addBasket} className="inline-flex px-5 py-2.5 text-sm font-medium text-green-300">
                        <svg className="-ms-2 me-2 h-5 w-5" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                        </svg>
                        Add to cart
                    </button>
                </div>
            </div>
      </div>
    );
}


export default function({ category }) {
    const carts: TovarProps[] = [];

    const renderFilter =()=> {
        // "flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
        return(
            <div className="flex items-center space-x-4">
                filters
            </div>
        );
    }
    const clickShowMore =()=> {

    }


    return(
        <section style={{height:'100%'}} className="py-8">
            <div className="mx-auto max-w-screen-xl">
                <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                    <div>
                        <nav className="flex">
                            Навигация
                        </nav>

                        <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            { category ?? 'Категория' } 
                        </h2>
                    </div>

                    { renderFilter() }
                </div>
                
                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                    { carts.map((tovar, index)=> 
                        <Cart key={index}
                            tovarData={tovar}
                        />
                    )}
                </div>
                { !carts[0] && 
                    <div style={{marginLeft:'47%', marginTop:'10%', color:'silver'}}>
                        нет товаров
                    </div>
                }
                
                <div style={{position:'absolute',bottom:50,left:0}} className="w-full text-center">
                    <button onClick={clickShowMore} className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                        Show more
                    </button>
                </div>
            </div>
        </section>
    );
}