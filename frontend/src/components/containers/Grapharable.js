import { Userable } from "./Userable";

class Grapharable extends Userable {

  addUser(profile) {
    if (super.addUser(profile) && this.graph) this.graph.addNodes([profile]);
  }

  removeUser(profile) {
    if (super.removeUser(profile) && this.graph) this.graph.removeNodeById(profile.id);
  }

  addRelations(new_relations) {
    super.addRelations(new_relations);
    if (this.graph) this.graph.addEdges(new_relations);
  }

  bindGraph(graph) {
    console.log("graph is bound");
    console.log(graph);
    this.graph = graph;
  }

  setProfileVisibility(profile, value, notHideIfShown) {
    if (!profile)
      return;
     // Если профиль не скрыт и его не нужно скрывать
    if (!profile.hidden && notHideIfShown)
      return;
    profile.hidden = !value;
    this.graph.setHiddenById(profile.id, !value);
  }
  
  render() {
    return this.props.children(
      this.state.users,
      this.state.relations,
      this.addRootUser.bind(this),
      this.addUser.bind(this),
      this.removeUser.bind(this),
      this.bindGraph.bind(this),
      this.useAggregators.bind(this),
    );
  }
}

export { Grapharable };
