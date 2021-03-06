import CreditMenuItem from '../LeftMenuBar/Credit/CreditMenuItem'
import LayerMenuItem from '../LeftMenuBar/Layer/LayerMenuItem'
import LegendMenuItem from '../LeftMenuBar/Legend/LegendMenuItem'
import MenuList from '../LeftMenuBar/MenuList'
import WeatherMenuItem from '../LeftMenuBar/Weather/WeatherMenuItem'
import MapViewContainer from '../MapViewContainer'
import React, { useContext, useMemo } from 'react'
import { DuiContext } from '../Context'
import { JSDCContext } from '../../JSDC/Context'
import { latLng } from 'leaflet'
import SceneMenuItem from '../LeftMenuBar/Scene/SceneMenuItem'
import AboutWalkMenuItem from '../LeftMenuBar/AboutWalk/AboutWalkMenuItem'
import { DguidewalksContext } from '../../JSDC/Dguidewalks/Context'
import { mapKeys, omit, pick } from 'lodash'

export interface IDguideWalksAppProps {
  mainMenuChildren?: React.ReactNode
  endMenuChildren?: React.ReactNode
}

const DguideWalksApp: React.FC<IDguideWalksAppProps> = ({
  mainMenuChildren,
  endMenuChildren
}) => {
  const { dgw: { layerNameOrder } } = useContext(DguidewalksContext)
  const dui = useContext(DuiContext)
  const { Jsdc, layerInfos } = useContext(JSDCContext)

  const orderedLayerInfos = useMemo(() => {
    const layerInfoMap = mapKeys(layerInfos, info => info.description.name)
    const matchedInfos = Object.values(pick(layerInfoMap, layerNameOrder))
    const restInfos = Object.values(omit(layerInfoMap, layerNameOrder))
    return [...matchedInfos, ...restInfos]
  }, [layerInfos, layerNameOrder])
  
  return (
    <MapViewContainer
      Jsdc={Jsdc}
      headerImgSrc={dui.headerMBImgSrc}
      menuChildren={(
        <MenuList
          title={dui.sidebarTitle} subtitle={dui.sidebarSubtitle}
          headerImg={dui.headerDImgSrc} headerMBImg={dui.headerMBImgSrc}
          endChildren={
            <>
              <AboutWalkMenuItem
                imgSrc={dui.aboutWalkImgSrc}
                title={dui.sidebarTitle}
                subtitle={dui.sidebarSubtitle}
                content={dui.aboutWalkContent}
                active={dui.activeMenuId === '????????????'} {...dui.menuSwitcherAction('????????????')}/>
              <CreditMenuItem
                active={dui.activeMenuId === '????????????'} {...dui.menuSwitcherAction('????????????')}
                herf={dui.creditHref}
                description={dui.credit}/>
              {endMenuChildren}
            </>
          }>
          <>
            <LayerMenuItem
              layerInfos={orderedLayerInfos.map(item => ({
                id: item.id,
                type: item.description.type,
                name: item.description.name,
                show: item.show
              }))}
              onToggleShow={(id, show) => Jsdc.Controller.get('Layer').getById(id).show = show}
              onOpacityChange={(id, opacity) => Jsdc.Controller.get('Layer').getById(id).setOpacity( Number( 1 - ( opacity/ 100 ) ) )}
              active={dui.activeMenuId === '????????????'} {...dui.menuSwitcherAction('????????????')}/>
            <SceneMenuItem
              onTarget={dui.onSceneTargetClick}
              active={dui.activeMenuId === '????????????'} {...dui.menuSwitcherAction('????????????')}/>
            {
              dui.weatherConfig.disabled || (
                <WeatherMenuItem active={dui.activeMenuId === '????????????'} {...dui.menuSwitcherAction('????????????')}
                  locations={dui.weatherConfig.locations}
                  token={dui.weatherConfig.token!}
                  onSelectLocation={([y, x]) => Jsdc.viewer?.flyTo(latLng(y, x), 13)}/>
              )
            }
            {
              <LegendMenuItem
                active={dui.activeMenuId === '????????????'} {...dui.menuSwitcherAction('????????????')}
                activeLegends={dui.legendConfig.activeLegends}/>
            }
            {mainMenuChildren}
          </>
        </MenuList>
      )}/>
  )
}

export default DguideWalksApp
