import React from 'react'
import { Text, View } from 'react-native'

// Assets
import indihomeLogo from 'src/assets/image/logo/indihome-logo.png';
import mncLogo from 'src/assets/image/logo/mnc-logo.png'
import { TCardMenu } from 'src/components';

const topUpIndihome = () => {
    const listMenu = [
        {
            image: indihomeLogo,
            name: 'Indihome'
        },
        {
            image: mncLogo,
            name: 'MNC Vision'
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

export default topUpIndihome

