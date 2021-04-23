import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'

// Styles
import styles from 'src/assets/style/main/index'

// Assets
import ChevronForward from 'src/assets/image/svg/chevron-forward-sharp.svg'

// eslint-disable-next-line react/prop-types
const TCardMenu = ({image, name}) => {
    return (
        <TouchableOpacity key={name} style={styles.TCardMenuContainer}>
                    <View style={styles.TCardMenuLeftComponent} >
                        <Image source={image} />
                        <Text style={styles.TCardMenuText} >{name}</Text>
                    </View>
                    <TouchableOpacity>
                        <ChevronForward/>
                    </TouchableOpacity>
                </TouchableOpacity>
    )
}

export default TCardMenu

