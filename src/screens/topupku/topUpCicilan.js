import React from 'react'
import { Text, View } from 'react-native'

// Assets
import bfiLogo from 'src/assets/image/logo/bfi-logo.png'
import hcLogo from 'src/assets/image/logo/homecredit-logo.png'
import { TCardMenu } from 'src/components'

const topUpCicilan = () => {
    const listMenu = [
        {
            image:bfiLogo,
            name:'BFI Finance'
        },
        {
            image: hcLogo,
            name: 'Home Credit Indonesia'
        }
    ]

    const RenderListMenu = () => {
        return listMenu.map((item) => {
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
            <RenderListMenu />
        </View>
    )
}

export default topUpCicilan

