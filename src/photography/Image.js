import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core'
import Person from '@material-ui/icons/Person'
import classnames from 'classnames'
import Typography from '@material-ui/core/Typography'

const styled = withStyles(
  theme => ({
    imageWrap: {
      cursor: 'pointer',
      position: 'relative',
      tapHighlightColor: 'rgba(255, 255, 255, 0)',
      '& img': {
        display: 'block',
        userDrag: 'none',
      },
    },
    itemWrapper: {
      position: 'relative',
    },
    iconPerson: {
      fill: 'white',
      position: 'absolute',
      left: 10,
      bottom: 10,
      background: 'rgba(17, 17, 17, .85)',
      borderRadius: '50%',
      padding: 5,
      width: 24,
      height: 24,
    },
    description: {
      bottom: 10,
      pointerEvents: 'none',
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
    },
    descriptionInner: {
      background: 'rgba(17, 17, 17, .85)',
      borderRadius: 5,
      display: 'inline-block',
      maxWidth: '90%',
      opacity: 0,
      padding: 10,
      textAlign: 'center',
      transition: 'opacity .3s ease-in-out',
    },
    descriptionVisible: {
      opacity: 1,
    },
    descriptionLine: {
      fontSize: 14,
      lineHeight: 1.2,
      textAlign: 'center',
    },
  })
)
const Image = styled(({
  index,
  photo,
  top,
  left,
  margin,
  direction,
  descriptionVisible,
  isMobile,
  classes,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const handleOnClick = e => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  useEffect(() => {
    setIsDescriptionVisible(isDescriptionVisible);
  }, [descriptionVisible]);

  const cleanPhoto = {
    alt: photo.alt,
    src: photo.src,
    height: photo.height,
    width: photo.width,
  }

  const style = direction === 'row' ? { margin } : {
    margin,
    height: photo.height,
    width: photo.width,
    position: 'absolute',
    top,
    left,
  }
  return (
    <div key={index} className={classes.imageWrap} onClick={isMobile ? handleOnClick : undefined} style={style}>
      <div className={classes.itemWrapper}>
        <img
          key={index}
          alt={""}
          loading={"lazy"}
          {...cleanPhoto}
        />
        {isMobile ? <Person className={classes.iconPerson} /> : ''}
      </div>
      <div className={classes.description}>
        <div className={classnames({
          [classes.descriptionInner]: true,
          [classes.descriptionVisible]: isDescriptionVisible,
        })}>
          <Typography className={classes.descriptionLine} variant="subtitle1">
            {photo.alt1}
          </Typography>
          <Typography className={classes.descriptionLine} variant="subtitle1">
            {photo.alt2}
          </Typography>
        </div>
      </div>
    </div>
  )
});

export default Image;
