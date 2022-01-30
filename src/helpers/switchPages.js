import Event from '@/helpers/eventBus'
export default function switchPages (namePage, paramPage) {
  Event.$emit('switchPages', namePage, paramPage)
}
