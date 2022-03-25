Running Environment Variables in Kubernetes
    kubectl create secret generic <Name of Secret> --from-literal=<Key-Value Pair> 
        e.g kubectl create secret generic jwt-secret --from-literal=JWT_KEY=secret