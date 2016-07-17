// https://facebook.github.io/react/blog/2015/02/20/introducing-relay-and-graphql.html

const FriendList = React.createClass({
  statics: {
    queryParams: {count: 10},
    queries: {
      viewer(params) {
        return graphql`
          Viewer {
            friends.first(${params.count}) {
              ${FriendListItem.getQuery('user')},
            }
          }
        `;
      }
    }
  },

  onScrollLoad() {
    this.setQueryParams({count: this.queryParams.count + 5});
  },

  render() {
    return {
      <div>
      {
        this.props.viewer.friends.map(user => <FriendListItem user={user} />);
      }
      </div>
    }
  }
});

const FriendListItem = React.createClass({
  statics: {
    queries: {
      user() {
        return graphql`
          User {
            ${ProfilePic.getQuery('user')},
            ${FriendInfo.getQuery('user')},
          }
        `;
      }
    }
  },

  render() {
    return (
      <div>
        <ProfilePic user={this.props.user} />
        <FriendInfo user={this.props.user} />
      </div>
    );
  }
});

/*
 * Needs
 *   * components have a queries property with names queries, which often embed child component queries
 *   * components have a getQuery method that returns the named queries
 *     * in cases where this is called w/i a the child nodes' returned pathSet is inserted into the parent component's pathSet
 *   * at the top, paths are deduped
 *
 * Lifecycle
 *   * app calls getQuery on top component, recursively collecting all component's queries
 *   * query is deduped and request issued
 *   * server/cache responds with data with same shape as query, which is recombined in a central store
 *   * data is passed down to views
 */
