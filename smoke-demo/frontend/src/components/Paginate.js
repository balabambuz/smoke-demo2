import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({pages, page, keyword = '', isAdmin = false}) {

    if(keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0] //splitto l'URL, ricavo un array e prendo il secondo parametro
                                                            //splitto il secondo parametro ottengo un Array e prendo il primo parametro
    }

    //console.log('KEYWORD:', keyword)

    return (pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) =>(
               <LinkContainer
                key={x + 1}
                to={!isAdmin ? `/shop/?keyword=${keyword}&page=${x + 1}`
                    : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`}
               >
                <Pagination.Item active={x + 1 ===page}>{x+1}</Pagination.Item>
               </LinkContainer> 
            ))}
        </Pagination>
    )
    )
}

export default Paginate 