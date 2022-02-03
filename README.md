# postcss-px2vm
The px is automatically converted to the corresponding VM unit based on the screen width of the design drawing

# Install

```shell
npm i postcss-px2vm -D
```


# Usage

## configuration

示例：

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-px2vm')({
      screen: 375, 
      toFixed: 2,
      identifier: '%'
    })
  ]
}
```


# example

```css
/* before */
.demo {
  width: '%300px';
  height: 400px;
  left: '%10px';
  border: '%-1px' solid black;
}

/* after */
.demo {
  width: 80vw;
  height: 400px;
  left: 2.67vw;
  border: -0.27vw solid black;
}

```

## option


### screen
> default 375

the screen width of the design



### toFixed
> default 2

The decimal point retains the number of digits

### identifier
> default %

matches the identifier that needs to be converted to VW


