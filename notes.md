## Naive Relay Approach
* queries and query parameters are statically defined on the component class, meaning they can be accessed without having to instantiate
* however:
  * query logic cannot take into account component properties
  * queryParams are shared across all instances of the class
  * even if different instances of a class could return different queries, the parent is only querying one instance, not all instances
