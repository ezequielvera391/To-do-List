import React, { useContext, useEffect } from 'react'
import { ListContainer } from "./ItemListStyles"
import { Item } from "../Item/Item"
import { DataContext } from "../../Context/DataProvider"
import { useQuery } from 'react-query'
// import { getItemList } from '../api/querysItems'
import getProducts from '../../utils/querysItemsFirebase'


export const ItemList = () => {
    
    const {texts, setTexts} = useContext(DataContext);
    const {data, isLoading, isError} = useQuery(['items'], getProducts)

    const editTexts = (value,id) => {
        
        const newTexts = [...texts];
        newTexts.forEach((text) => {
            if(text.id === id){
                text.name = value;
            }
        })
        setTexts(newTexts)
    }
    

    useEffect(() => {
        try {
            const newTexts = [...texts]
                for (let item of data) {
                    newTexts.push({name: item.name, id:item.id})
                }  
                setTexts(newTexts)
        } catch {  
        }
    }, [data])
        
    if (!isLoading && !isError) {
        
        return (
            <ListContainer>
                {
                    texts.map((text, index) => (
                        <Item text={text} key={index} id={text.id} editTexts={editTexts} />
                    ))
                }
            </ListContainer>
        )
    } else if (isLoading) {
        return (
            <ListContainer>
                <span className='loading'>Loading... </span>   
            </ListContainer>
        )
        
    } else {
        return (
            <ListContainer>
                <span className='error'>cannot connect... try 'npm run fake-api'</span>
                {
                    texts.map((text, index) => (
                        <Item text={text} key={index} id={text.id} editTexts={editTexts} />
                    ))
                }
            </ListContainer>
        )
        
    }
}

