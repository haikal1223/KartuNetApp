import React from 'react'
import { View } from 'react-native';

// Assets
import pln_logo from 'src/assets/image/logo/pln-logo.png'
import { TCardMenu } from 'src/components';

const topUpListrik = () => {
    const listItem = [
        {
            image: pln_logo,
            name: 'PLN Electricity Bill'
        },
        {
            image: pln_logo,
            name: 'PLN Electricity Token'
        },
        {
            image: pln_logo,
            name: 'PLN Non-Taglist'
        }
    ]

    const RenderListItem = () => {
        return listItem.map((item) => {
            return(
                <TCardMenu
                    key={item.name}
                    image={item.image}
                    name={item.name}
                />

            )
        })
    }

    return (
        <View>
            <RenderListItem />
        </View>
    )
}

export default topUpListrik

