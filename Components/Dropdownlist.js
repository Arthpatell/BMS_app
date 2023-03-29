import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
  import { StyleSheet, Text, View ,Alert} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';




  const data = [
    { label: 'All', value: '1' },
    { label: 'Pending', value: '2' },
    { label: 'Done', value: '3' },
    
  ];

  const DropdownComponent = (props) => {
    const [value, setValue] = useState(value);
    const [isFocus, setIsFocus] = useState(false);
   
    return (
      <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={styles.text}
          data={data}
          placeholder=''
          maxHeight={200}
          labelField="label"
          valueField="value"
         
          value='1'
          
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={async item => {
            setValue(item.value);
            props.setSelStatus(item.value)
            // setIsFocus(false);
            
          }}
         
        />
  
    );
  };

  export default DropdownComponent;
 
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
    },
    dropdown: {
      // borderWidth:0.1,
      borderRadius:1,
      width:100,
      marginLeft:10,
      top:10,
      elevation:1     
    },
   
    
    placeholderStyle: {
      fontSize: 16,
      color:'black',
      
    },
    selectedTextStyle: {
      fontSize: 16,
      color:'black',
      marginLeft:10
      
    },
    iconStyle: {
      width: 20,
      height: 20,
      backgroundColor:'white',
      marginRight:5,
      
      
    },

    text:{
    color:'black',
    }
  });