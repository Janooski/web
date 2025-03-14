# Entra ID SSO notes

Notes and useful links on how to connect an application to Entra ID SSO by Roman Weber.

## Single sign-on options

When checking the diagram in the [SSO documentation](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/plan-sso-deployment#single-sign-on-options), it says to choose **OpenID Connect/OAuth 2.0** for new applications.

## OAuth authentication flow

The Identity provider (IDP) will be Microsoft Entra ID. An app registration is needed for to connect an app to a tenant. It is sufficient to create an app registration and make us owner, which allows us to make all the other configurations ourselves. [This documentation gives a good overview of what roles/parties are involved in OAuth](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols).

## Quick-start: Single-page app

[This quick-start guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-single-page-app-sign-in?pivots=workforce&tabs=javascript-workforce%2Cjavascript-external) gives a sample application that enable SSO via an app registration. Good for a proof of concept.

## Next steps

- Create ticket for OST IT that request an Entra ID app registration.
- Test sample application with another tenant.

## Ticket OST

Guten Tag,

im SEProject ModuleDependencyOST bauen wir Verbesserungen und Erweiterungen der Website https://lost.university. Dabei handelt es sich um eine Website, mit der Informatik-Studierende Module visuell planen können. Momentan ist es eine Single Page Applikation die nur im Browser ausgeführt wird. Eine Verbesserung ist, dass unterschiedliche Pläne in einem Benutzerprofil gespeichert werden können. Dafür müssen wir eine Anmeldelogik bauen, die dafür naheliegenste Option ist eine SSO Anbindung mit OAuth an eine App Registration in Entra ID. Naheliegend weil es für die Benutzer, die onehin schon bei O365 angemeldet sind, die schönste Lösung ist und auch aus Sicht Security Sinn macht. Ausserdem ist es für uns eine Erleichterung, denn wir müssen uns nicht ums User Mangement kümmern und können weitere Features implementieren.

Da ich beruflich selbst ab und an mit solchen Anfragen zu tun habe, kann ich ziemlich genau sagen was wir benötigen. Eine App Registration (Name zb: lost-university-sso) mit Owner-Berechtigungen genügt. Ab dort können wir die nötigen Einstellungen selbst vornehmen. Dieser Quick-start Guide erklärt, was wir vor haben: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-single-page-app-sign-in?pivots=workforce&tabs=javascript-workforce%2Cjavascript-external#register-the-application-and-record-identifiers.

Wir hoffen, dass unsere Anfrage umgesetzt werden kann. Denn eine solche SSO Anbindung wäre für uns die beste Lösung. Bei allfälligen Rückfragen stehe ich natürlich zu Verfügung.

Vielen Dank im Voraus, Gruss Roman
