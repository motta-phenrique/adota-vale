# Adota Vale

PWA de adocao de caes da rede de abrigos do Vale do Ivai (centro-norte do Parana).
Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui.

## Rodando

```bash
node scripts/fix-dynamic-routes.mjs   # 1x: renomeia -slug- para [slug]
npm install
npm run dev
```

## Rotas

| Rota | Tela |
| --- | --- |
| `/login` | Entrar |
| `/cadastro` | Cadastro de adotante |
| `/cadastro-abrigo` | Cadastro de abrigo (desktop) |
| `/onboarding` | Preferencias: porte, cor, energia |
| `/sugestoes` | Sugestoes com % de compatibilidade (lista ou grade) |
| `/buscar` | Busca com painel de filtros |
| `/caes/[slug]` | Perfil do cao |
| `/caes/[slug]/adotar` | Solicitacao de adocao |
| `/abrigos` | Abrigos da regiao |
| `/abrigos/[slug]` | Perfil do abrigo |
| `/favoritos` | Salvos e solicitacoes |
| `/painel/caes/novo` | Painel do abrigo: cadastrar cao |

## Compatibilidade

`lib/match.ts` calcula a pontuacao 0-100 entre um cao e as preferencias do adotante.
Pesos: porte 26, cor 18, energia 16, idade 10, bom com criancas 10, bom com outros animais 8,
sexo 6, necessidades especiais 6. Distancia acima do limite aplica penalidade de 15%.
Ajuste os pesos em `WEIGHTS` sem tocar nas telas.

## Dados

Mock em `lib/data/` (`dogs.ts`, `shelters.ts`, `preferences.ts`). Sem banco.
Ao ligar a API, troque os imports nos Server Components de `app/**/page.tsx` —
os componentes de UI recebem tudo por props.

## Design tokens

Definidos em `tailwind.config.ts` e `app/globals.css`:

- `petrol` #0F3D56 (primaria), `coral` #F0603C (acao), `ink` #10242F (texto)
- `sand` 50-600 (fundo e bordas), `moss` (estados positivos)
- Tipografia: Newsreader nos titulos (`font-serif`), Outfit no resto (`font-sans`)

## Fotos

Todas as imagens sao `<PhotoSlot />` — placeholders de cor. Substitua por `next/image`
quando as fotos reais dos caes chegarem.

## PWA

`app/manifest.ts` gera o manifest (standalone, start em `/sugestoes`).
Falta adicionar os icones em `public/icons/` (192, 512 e maskable) e um service worker
se voce quiser cache offline.
