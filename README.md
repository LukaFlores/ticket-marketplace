Skaffold runs locally on http://ticketing.dev/
Edit /etc/hosts
[ADD] 127.0.0.1 ticketing.dev


Running Environment Variables in Kubernetes
    kubectl create secret generic <Name of Secret> --from-literal <Key-Value Pair> 
        - kubectl create secret generic jwt-secret --from-literal JWT_KEY=secret
        - kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=<Stripe secret key from dashboard>

Deployment:
    Inside Kubectl Context:
        Add Secrets:
        - kubectl create secret generic jwt-secret --from-literal JWT_KEY=<RANDOM String>
        - kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=<Stripe secret key from dashboard>
        Install ingress-nginx:
            https://kubernetes.github.io/ingress-nginx/deploy/
            
            e.g Digital Ocean: kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.3/deploy/static/provider/do/deploy.yaml