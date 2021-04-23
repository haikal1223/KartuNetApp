import React from 'react'
import { Text, View } from 'react-native'

// Assets
import aetraLogo from 'src/assets/image/logo/aetra-logo.png'
import atsLogo from 'src/assets/image/logo/ats-logo.png'
import { TCardMenu } from 'src/components'

const topUpPam = () => {
    const listMenu = [
        {
            image: aetraLogo,
            name: 'Jakarta Aetra'
        },
        {
            image: atsLogo,
            name: 'PAM ATS Palembang'
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

export default topUpPam

