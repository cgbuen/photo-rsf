import { types } from 'mobx-state-tree'
import AppModelBase from 'react-storefront/model/AppModelBase'
import { MenuModel } from './MenuModel'
import { TabsModel } from './components/NavTabs'
import SocialModel from './SocialModel'
import ConfigModel from './config/ConfigModel'
import ProjectModel from './projects/ProjectModel'
import PhotoModel from './photography/PhotoModel'
import LinkModel from './resources/LinkModel'
import CommandModel from './resources/CommandModel'
import ItemModel from './resources/ItemModel'
import PlateModel from './resources/PlateModel'
import DescriptionModel from './resources/DescriptionModel'
import BuildModel from './collection/BuildModel'
import BuildFilterModel from './collection/BuildFilterModel'
import KeysetModel from './collection/KeysetModel'

const AppModel = types.compose(
  AppModelBase,
  types
    .model('AppModel', {
      menu: types.optional(MenuModel, {}),
      tabs: types.optional(TabsModel, {}),
      config: types.optional(ConfigModel, {}),
      social: types.optional(SocialModel, {}),
      projects: types.optional(types.array(ProjectModel), []),
      photos: types.optional(types.array(PhotoModel), []),
      links: types.optional(types.array(LinkModel), []),
      commands: types.optional(types.array(CommandModel), []),
      gear: types.optional(types.array(ItemModel), []),
      gearDescriptions: types.optional(types.array(DescriptionModel), []),
      plates: types.optional(types.array(PlateModel), []),
      builds: types.optional(types.array(BuildModel), []),
      buildFiltersActive: types.optional(BuildFilterModel, {}),
      keysets: types.optional(types.array(KeysetModel), []),
      keysetSort: 'purchase_date',
      keysetDesc: true,
      openBuild: types.optional(BuildModel, {}),
      openKeyset: types.optional(KeysetModel, {}),
      openProject: types.optional(ProjectModel, {}),
    })
    .actions(self => ({
      toggleFilteredBuilds(val) {
        self.builds = self.builds.map(x => {
          if (x.assembly_variant.includes('A') && x.build_status === val) {
            x.setLoaded(true)
            x.setDisplayed(!x.displayed)
          }
          return x
        })
        self.buildFiltersActive.toggle(val)
      },
      setOpenBuild(build) {
        self.openBuild = {...build}
      },
      setOpenKeyset(keyset) {
        self.openKeyset = {...keyset}
      },
      setOpenProject(project) {
        self.openProject = {...project}
      },
      sortKeysets(sort) {
        if (self.keysetSort === sort) {
          self.keysets = self.keysets.reverse()
          self.keysetDesc = !self.keysetDesc
        } else {
          const sorted = self.keysets.sort((x, y) => {
            if (x[sort] === '') {
              return 1
            }
            if (y[sort] === '') {
              return -1
            }
            return x[sort].localeCompare(y[sort])
          })
          self.keysets = sorted
          self.keysetSort = sort
          self.keysetDesc = true
        }
      },
    }))
)

export default AppModel
