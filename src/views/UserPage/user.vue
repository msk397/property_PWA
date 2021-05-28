<template>
  <div>
    <v-card class="overflow-hidden mx-auto rounded-0">
      <v-bottom-navigation  height="70" class="rounded-0" color="primary" flat absolute   grow transparent >
        <v-btn to="/user/adminlist"><v-icon>mdi-home</v-icon></v-btn>
        <v-btn  to="/user/people"><v-icon>{{mdiAccountTie}}</v-icon></v-btn>
        <v-btn  to="/user/other"><v-icon>{{mdiHammerScrewdriver}}</v-icon></v-btn>
      </v-bottom-navigation>

      <!--TODO 获取当前设备的高度替换812        -->
      <v-responsive id="hide-on-scroll-example" class="overflow-y-auto" :max-height=this.screenHeight  :min-height=this.screenHeight>
        <v-app-bar app flat color="white">
      <v-menu transition="slide-y-transition" bottom offset-y>
        <template v-slot:activator="{on}">
      <v-btn text v-on="on">
        <div class="d-flex align-center">
          <v-list-item-avatar>
            <v-img
                class="elevation-6"
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjY0cHgiIGhlaWdodD0iMjgwcHgiIHZpZXdCb3g9IjAgMCAyNjQgMjgwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGRhdGEtcmVhY3Ryb290PSIiPjxkZXNjPkNyZWF0ZWQgd2l0aCBnZXRhdmF0YWFhcnMuY29tPC9kZXNjPjxkZWZzPjxjaXJjbGUgaWQ9InBhdGgtMSIgY3g9IjEyMCIgY3k9IjEyMCIgcj0iMTIwIj48L2NpcmNsZT48cGF0aCBkPSJNMTIsMTYwIEMxMiwyMjYuMjc0MTcgNjUuNzI1ODMsMjgwIDEzMiwyODAgQzE5OC4yNzQxNywyODAgMjUyLDIyNi4yNzQxNyAyNTIsMTYwIEwyNjQsMTYwIEwyNjQsLTEuNDIxMDg1NDdlLTE0IEwtMy4xOTc0NDIzMWUtMTQsLTEuNDIxMDg1NDdlLTE0IEwtMy4xOTc0NDIzMWUtMTQsMTYwIEwxMiwxNjAgWiIgaWQ9InBhdGgtMyI+PC9wYXRoPjxwYXRoIGQ9Ik0xMjQsMTQ0LjYxMDk1MSBMMTI0LDE2MyBMMTI4LDE2MyBMMTI4LDE2MyBDMTY3Ljc2NDUwMiwxNjMgMjAwLDE5NS4yMzU0OTggMjAwLDIzNSBMMjAwLDI0NCBMMCwyNDQgTDAsMjM1IEMtNC44Njk3NDcwMWUtMTUsMTk1LjIzNTQ5OCAzMi4yMzU0OTgsMTYzIDcyLDE2MyBMNzIsMTYzIEw3NiwxNjMgTDc2LDE0NC42MTA5NTEgQzU4Ljc2MjYzNDUsMTM2LjQyMjM3MiA0Ni4zNzIyMjQ2LDExOS42ODcwMTEgNDQuMzA1MTM4OCw5OS44ODEyMzg1IEMzOC40ODAzMTA1LDk5LjA1Nzc4NjYgMzQsOTQuMDUyMTA5NiAzNCw4OCBMMzQsNzQgQzM0LDY4LjA1NDAwNzQgMzguMzI0NTczMyw2My4xMTgwNzMxIDQ0LDYyLjE2NTkxNjkgTDQ0LDU2IEw0NCw1NiBDNDQsMjUuMDcyMDU0IDY5LjA3MjA1NCw1LjY4MTM3MTUxZS0xNSAxMDAsMCBMMTAwLDAgTDEwMCwwIEMxMzAuOTI3OTQ2LC01LjY4MTM3MTUxZS0xNSAxNTYsMjUuMDcyMDU0IDE1Niw1NiBMMTU2LDYyLjE2NTkxNjkgQzE2MS42NzU0MjcsNjMuMTE4MDczMSAxNjYsNjguMDU0MDA3NCAxNjYsNzQgTDE2Niw4OCBDMTY2LDk0LjA1MjEwOTYgMTYxLjUxOTY5LDk5LjA1Nzc4NjYgMTU1LjY5NDg2MSw5OS44ODEyMzg1IEMxNTMuNjI3Nzc1LDExOS42ODcwMTEgMTQxLjIzNzM2NSwxMzYuNDIyMzcyIDEyNCwxNDQuNjEwOTUxIFoiIGlkPSJwYXRoLTUiPjwvcGF0aD48L2RlZnM+PGcgaWQ9IkF2YXRhYWFyIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODI1LjAwMDAwMCwgLTExMDAuMDAwMDAwKSIgaWQ9IkF2YXRhYWFyL0NpcmNsZSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODI1LjAwMDAwMCwgMTEwMC4wMDAwMDApIj48ZyBpZD0iTWFzayI+PC9nPjxnIGlkPSJBdmF0YWFhciIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG1hc2s9InVybCgjbWFzay00KSI+PGcgaWQ9IkJvZHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMyLjAwMDAwMCwgMzYuMDAwMDAwKSI+PG1hc2sgaWQ9Im1hc2stNiIgZmlsbD0id2hpdGUiPjx1c2UgeGxpbms6aHJlZj0iI3BhdGgtNSI+PC91c2U+PC9tYXNrPjx1c2UgZmlsbD0iI0QwQzZBQyIgeGxpbms6aHJlZj0iI3BhdGgtNSI+PC91c2U+PGcgaWQ9IlNraW4v8J+RtvCfj70tMDMtQnJvd24iIG1hc2s9InVybCgjbWFzay02KSIgZmlsbD0iI0VEQjk4QSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDAuMDAwMDAwKSIgaWQ9IkNvbG9yIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjY0IiBoZWlnaHQ9IjI4MCI+PC9yZWN0PjwvZz48L2c+PHBhdGggZD0iTTE1Niw3OSBMMTU2LDEwMiBDMTU2LDEzMi45Mjc5NDYgMTMwLjkyNzk0NiwxNTggMTAwLDE1OCBDNjkuMDcyMDU0LDE1OCA0NCwxMzIuOTI3OTQ2IDQ0LDEwMiBMNDQsNzkgTDQ0LDk0IEM0NCwxMjQuOTI3OTQ2IDY5LjA3MjA1NCwxNTAgMTAwLDE1MCBDMTMwLjkyNzk0NiwxNTAgMTU2LDEyNC45Mjc5NDYgMTU2LDk0IEwxNTYsNzkgWiIgaWQ9Ik5lY2stU2hhZG93IiBmaWxsLW9wYWNpdHk9IjAuMTAwMDAwMDAxIiBmaWxsPSIjMDAwMDAwIiBtYXNrPSJ1cmwoI21hc2stNikiPjwvcGF0aD48L2c+PGcgaWQ9IkNsb3RoaW5nL0hvb2RpZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDE3MC4wMDAwMDApIj48ZGVmcz48cGF0aCBkPSJNMTA4LDEzLjA3MDg4NTYgQzkwLjA4MTMwMDYsMTUuMDc1OTM4IDc2LjI3OTg0MjQsMjAuNTUxODM0MSA3Ni4wMDQyMDMsMzQuNjQ0OTY3NiBDNTAuMTQ2NDMyOSw0NS41NjgwOTMzIDMyLDcxLjE2NDYyNTcgMzIsMTAwLjk5OTQ4NSBMMzIsMTAwLjk5OTQ4NSBMMzIsMTEwIEwyMzIsMTEwIEwyMzIsMTAwLjk5OTQ4NSBDMjMyLDcxLjE2NDYyNTcgMjEzLjg1MzU2Nyw0NS41NjgwOTMzIDE4Ny45OTU3OTcsMzQuNjQ0OTgzMiBDMTg3LjcyMDE1OCwyMC41NTE4MzQxIDE3My45MTg2OTksMTUuMDc1OTM4IDE1NiwxMy4wNzA4ODU2IEwxNTYsMzIgTDE1NiwzMiBDMTU2LDQ1LjI1NDgzNCAxNDUuMjU0ODM0LDU2IDEzMiw1NiBMMTMyLDU2IEMxMTguNzQ1MTY2LDU2IDEwOCw0NS4yNTQ4MzQgMTA4LDMyIEwxMDgsMTMuMDcwODg1NiBaIiBpZD0icmVhY3QtcGF0aC04MzI4NzcyIj48L3BhdGg+PC9kZWZzPjxtYXNrIGlkPSJyZWFjdC1tYXNrLTgzMjg3NzMiIGZpbGw9IndoaXRlIj48dXNlIHhsaW5rOmhyZWY9IiNyZWFjdC1wYXRoLTgzMjg3NzIiPjwvdXNlPjwvbWFzaz48dXNlIGlkPSJIb29kaWUiIGZpbGw9IiNCN0MxREIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgeGxpbms6aHJlZj0iI3JlYWN0LXBhdGgtODMyODc3MiI+PC91c2U+PGcgaWQ9IkNvbG9yL1BhbGV0dGUvR3JheS0wMSIgbWFzaz0idXJsKCNyZWFjdC1tYXNrLTgzMjg3NzMpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNGRkZGRkYiPjxyZWN0IGlkPSLwn5aNQ29sb3IiIHg9IjAiIHk9IjAiIHdpZHRoPSIyNjQiIGhlaWdodD0iMTEwIj48L3JlY3Q+PC9nPjxwYXRoIGQ9Ik0xMDIsNjEuNzM5MDUzMSBMMTAyLDExMCBMOTUsMTEwIEw5NSw1OC4xNTAyNjI1IEM5Ny4yMDM3NTQyLDU5LjQ2MDA1NzYgOTkuNTQ2NzY5NCw2MC42NjA3ODc4IDEwMiw2MS43MzkwNTMxIFogTTE2OSw1OC4xNTAyNjI1IEwxNjksOTguNSBDMTY5LDEwMC40MzI5OTcgMTY3LjQzMjk5NywxMDIgMTY1LjUsMTAyIEMxNjMuNTY3MDAzLDEwMiAxNjIsMTAwLjQzMjk5NyAxNjIsOTguNSBMMTYyLDYxLjczOTA1MzEgQzE2NC40NTMyMzEsNjAuNjYwNzg3OCAxNjYuNzk2MjQ2LDU5LjQ2MDA1NzYgMTY5LDU4LjE1MDI2MjUgWiIgaWQ9IlN0cmFwcyIgZmlsbD0iI0Y0RjRGNCIgZmlsbC1ydWxlPSJldmVub2RkIiBtYXNrPSJ1cmwoI3JlYWN0LW1hc2stODMyODc3MykiPjwvcGF0aD48cGF0aCBkPSJNOTAuOTYwMTMyOSwxMi43MjQzNTM3IEM3NS45MDkzMDk1LDE1LjU3MTE3ODIgNjUuNSwyMS4yNDI4ODQ3IDY1LjUsMzIuMzA3NjkyMyBDNjUuNSw1Mi4wMjAwMDk1IDk4LjUzNzY4MDcsNjggMTMyLDY4IEMxNjUuNDYyMzE5LDY4IDE5OC41LDUyLjAyMDAwOTUgMTk4LjUsMzIuMzA3NjkyMyBDMTk4LjUsMjEuMjQyODg0NyAxODguMDkwNjksMTUuNTcxMTc4MiAxNzMuMDM5ODY3LDEyLjcyNDM1MzcgQzE4Mi4xMjQ5MjEsMTYuMDc0NDU5OCAxODgsMjEuNzA2MDU0NiAxODgsMzEuMDc2OTIzMSBDMTg4LDUxLjQ2ODk3NTQgMTYwLjE3ODc5NSw2OCAxMzIsNjggQzEwMy44MjEyMDUsNjggNzYsNTEuNDY4OTc1NCA3NiwzMS4wNzY5MjMxIEM3NiwyMS43MDYwNTQ2IDgxLjg3NTA3OTUsMTYuMDc0NDU5OCA5MC45NjAxMzI5LDEyLjcyNDM1MzcgWiIgaWQ9IlNoYWRvdyIgZmlsbC1vcGFjaXR5PSIwLjE2IiBmaWxsPSIjMDAwMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG1hc2s9InVybCgjcmVhY3QtbWFzay04MzI4NzczKSI+PC9wYXRoPjwvZz48ZyBpZD0iRmFjZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzYuMDAwMDAwLCA4Mi4wMDAwMDApIiBmaWxsPSIjMDAwMDAwIj48ZyBpZD0iTW91dGgvRGVmYXVsdCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi4wMDAwMDAsIDUyLjAwMDAwMCkiIGZpbGwtb3BhY2l0eT0iMC42OTk5OTk5ODgiPjxwYXRoIGQ9Ik00MCwxNSBDNDAsMjIuNzMxOTg2NSA0Ni4yNjgwMTM1LDI5IDU0LDI5IEw1NCwyOSBDNjEuNzMxOTg2NSwyOSA2OCwyMi43MzE5ODY1IDY4LDE1IiBpZD0iTW91dGgiPjwvcGF0aD48L2c+PGcgaWQ9Ik5vc2UvRGVmYXVsdCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjguMDAwMDAwLCA0MC4wMDAwMDApIiBmaWxsLW9wYWNpdHk9IjAuMTYiPjxwYXRoIGQ9Ik0xNiw4IEMxNiwxMi40MTgyNzggMjEuMzcyNTgzLDE2IDI4LDE2IEwyOCwxNiBDMzQuNjI3NDE3LDE2IDQwLDEyLjQxODI3OCA0MCw4IiBpZD0iTm9zZSI+PC9wYXRoPjwvZz48ZyBpZD0iRXllcy9EZWZhdWx0LfCfmIAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCA4LjAwMDAwMCkiIGZpbGwtb3BhY2l0eT0iMC41OTk5OTk5NjQiPjxjaXJjbGUgaWQ9IkV5ZSIgY3g9IjMwIiBjeT0iMjIiIHI9IjYiPjwvY2lyY2xlPjxjaXJjbGUgaWQ9IkV5ZSIgY3g9IjgyIiBjeT0iMjIiIHI9IjYiPjwvY2lyY2xlPjwvZz48ZyBpZD0iRXllYnJvdy9OYXR1cmFsL0RlZmF1bHQtTmF0dXJhbCIgZmlsbC1vcGFjaXR5PSIwLjU5OTk5OTk2NCI+PHBhdGggZD0iTTI2LjAzOTA5MzQsNi4yMTAxMjM2NCBDMjAuMjc3NTU1NCw2Ljk4MzQ2MjE2IDExLjI5MjkzMTMsMTIuMDA1MjQ3OSAxMi4wNDQyNiwxNy44MTc4MTExIEMxMi4wNjg5NDgxLDE4LjAwODA1NDMgMTIuMzU2NzMwMiwxOC4wNjczNDY4IDEyLjQ4MDkwNzcsMTcuOTA4NDkzNyBDMTQuOTY3NDA0MSwxNC43MjAzMzUxIDM0LjE5Mjc5NzMsMTAuMDM2NTQ4MSA0MS4xOTQyNjczLDExLjAxNDcxNTEgQzQxLjgzNTA1MjMsMTEuMTA0NDQ2NSA0Mi4yNTgwNjYyLDEwLjQ0MzAzNDMgNDEuODIxMDUwMSwxMC4wMzAyMDY3IEMzOC4wNzY1NjYzLDYuNDk0ODU0MjYgMzEuMjAwMzc5Miw1LjUxMjI0ODI1IDI2LjAzOTA5MzQsNi4yMTAxMjM2NCIgaWQ9IkV5ZWJyb3ciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI3LjAwMDAwMCwgMTIuMDAwMDAwKSByb3RhdGUoNS4wMDAwMDApIHRyYW5zbGF0ZSgtMjcuMDAwMDAwLCAtMTIuMDAwMDAwKSAiPjwvcGF0aD48cGF0aCBkPSJNODUuMDM5MDkzNCw2LjIxMDEyMzY0IEM3OS4yNzc1NTU0LDYuOTgzNDYyMTYgNzAuMjkyOTMxMywxMi4wMDUyNDc5IDcxLjA0NDI2LDE3LjgxNzgxMTEgQzcxLjA2ODk0ODEsMTguMDA4MDU0MyA3MS4zNTY3MzAyLDE4LjA2NzM0NjggNzEuNDgwOTA3NywxNy45MDg0OTM3IEM3My45Njc0MDQxLDE0LjcyMDMzNTEgOTMuMTkyNzk3MywxMC4wMzY1NDgxIDEwMC4xOTQyNjcsMTEuMDE0NzE1MSBDMTAwLjgzNTA1MiwxMS4xMDQ0NDY1IDEwMS4yNTgwNjYsMTAuNDQzMDM0MyAxMDAuODIxMDUsMTAuMDMwMjA2NyBDOTcuMDc2NTY2Myw2LjQ5NDg1NDI2IDkwLjIwMDM3OTIsNS41MTIyNDgyNSA4NS4wMzkwOTM0LDYuMjEwMTIzNjQiIGlkPSJFeWVicm93IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4Ni4wMDAwMDAsIDEyLjAwMDAwMCkgc2NhbGUoLTEsIDEpIHJvdGF0ZSg1LjAwMDAwMCkgdHJhbnNsYXRlKC04Ni4wMDAwMDAsIC0xMi4wMDAwMDApICI+PC9wYXRoPjwvZz48L2c+PGcgaWQ9IlRvcCIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxkZWZzPjxyZWN0IGlkPSJyZWFjdC1wYXRoLTgzMjg3NzgiIHg9IjAiIHk9IjAiIHdpZHRoPSIyNjQiIGhlaWdodD0iMjgwIj48L3JlY3Q+PHBhdGggZD0iTTk0LjI1MTkyNjksNTIuMDIyMTE0OSBDOTQuMzc0OTM1Myw1MS45Njc3MTQ5IDk0LjA2OTY3MTIsNTEuOTQ2ODE0OSA5My4zMzYxMzQ1LDUxLjk1OTUxNDkgQzk0LjIyNzY2MzcsNTEuOTU3NzE0OSA5NC41MzI5Mjc5LDUxLjk3ODUxNDkgOTQuMjUxOTI2OSw1Mi4wMjIxMTQ5IE04Ni4xMTY5Nzc1LDM2LjMwMTU5MjQgQzg2LjExNDg0MjIsMzYuMjgxOTkyNCA4Ni4xMzM3NTQ4LDM2LjQ1MjY5MjQgODYuMTE2OTc3NSwzNi4zMDE1OTI0IE0xOTMuNzY1MDU2LDcwLjc2NTY2NjUgQzE5My41MDA5NDYsNjcuNDQ4NzM0IDE5My4wMzI5NSw2NC4xNTE4ODY0IDE5Mi4yNDY2NzYsNjAuOTExMDgyMyBDMTkxLjYyMjIzMyw1OC4zMzUzNDkyIDE5MC43NjkwMDcsNTUuODc3NTM0MyAxODkuNzYwMDA2LDUzLjQyMDA0MzMgQzE4OS4xNTA3MDMsNTEuOTM1Mzc2NiAxODcuNzI3NTM4LDQ5Ljg5NjEwNjIgMTg3LjU2MDMyNCw0OC4yOTQ0OTMzIEMxODcuMzk1NDY2LDQ2LjcxNjg1MjcgMTg4LjYyNjUyMSw0NC45NjkxMzggMTg4Ljg4OTI4NSw0My4xMzIzMzY4IEMxODkuMTQ0MzExLDQxLjM0NDc3NjEgMTg5LjEwMDkwOSwzOS40NjUyMTM0IDE4OC43MzQxODMsMzcuNjkzODUwMyBDMTg3LjkwMTE0NCwzMy42NzEwMjg4IDE4NS4xNDAyNzEsMjkuOTMwMDQ0NyAxODAuODc3MTY3LDI4Ljg4MTQxNTggQzE3OS45MjUzNjIsMjguNjQ3MTk5NCAxNzcuOTEzNDE3LDI4LjkzNTgzOTYgMTc3LjI0MDg2MiwyOC4zODE1NTk3IEMxNzYuNDY5NzI5LDI3Ljc0NTk2ODIgMTc1LjkzMjc2MSwyNS41ODA2ODA4IDE3NS4yMzQ2MzcsMjQuNzEyMTY4NyBDMTczLjI0NDIyNCwyMi4yMzYyMTI1IDE3MC4xMzk4NCwyMC42NDE3MjY1IDE2Ni44NjU4ODcsMjEuMTk3NjI2MSBDMTY0LjQ1NDkxNywyMS42MDY3NzYgMTY1LjgzOTM5MSwyMi4xMDUzMzYzIDE2NC4wMzIwMDUsMjAuNjg2NDMxNyBDMTYzLjAyNzA0MSwxOS44OTc2MTE0IDE2Mi4yNzYwOTUsMTguNjkzMTYyMiAxNjEuMzAwMDY2LDE3LjgzOTIyNzkgQzE1OS44MzI4MjYsMTYuNTU2MzgyNiAxNTguMTQ5NTg4LDE1LjQ1ODE4OTMgMTU2LjQwODE0NiwxNC41NTY5NTggQzE1MS44NTEzMjUsMTIuMTk4OTIgMTQ2LjY1NDI0OSwxMC40ODQ4OTYxIDE0MS41NjQxNjIsOS42NDk0MjY5MyBDMTMyLjI3ODkzNCw4LjEyNTIzODI3IDEyMi4zNjg5MjYsOS40NTQwODQ1OCAxMTMuMzY4NjY4LDExLjg2ODgxNDEgQzEwOC44OTAyMzksMTMuMDcwMzQ3NyAxMDQuMzgxNTMxLDE0LjU5NTE4NDIgMTAwLjIyMjA1MywxNi42MTE3NzgyIEM5OC40Mzg1NTQyLDE3LjQ3NjQwMjkgOTcuNDA5MDMwNCwxOC4xOTM2MzAxIDk1LjU0OTQ5NTEsMTguNDIwMDcxNyBDOTIuNjIwNzM1NSwxOC43NzY3NDE2IDkwLjE0MDQ1NzksMTguNzU4OTI0MyA4Ny4zNjYxMjY4LDIwLjAwMDk1MTcgQzc4LjgyOTgyNjksMjMuODIyOTIzNiA3NC45ODQ5MjU2LDMyLjY4OTc4MTggNzguMzA2NjUzOSw0MS4xNzUwMjU5IEM3OC45NzQ4MzUsNDIuODgxNTk4OCA3OS44Nzk1Mzc0LDQ0LjM4MDE5NTQgODEuMTI2NzQxNiw0NS43NTg2MDYyIEM4Mi42NDc0NzYxLDQ3LjQzOTI2MzEgODMuMTk3NTY0OCw0Ny4xMDg1MDkzIDgxLjg4Nzc4MTcsNDkuMDQxMTk5OSBDNzkuOTI4OTk0OSw1MS45MzExNjUzIDc4LjI3NzcxOTUsNTUuMDEyOTA5NSA3Ni45MzMyODI2LDU4LjIxMjg5NTggQzczLjQwNDMwMzgsNjYuNjE0NTYwNiA3Mi44MTM4NDE2LDc2LjA3NzE2NDMgNzMuMDQzNjM0LDg1LjAzNzMyMDMgQzczLjEyNDA0NDUsODguMTc0MTM2MiA3My4yNTg2MjI4LDkxLjM0OTUwMjIgNzMuNzUzMTk4LDk0LjQ1NjE5MDcgQzczLjk2Njg0MSw5NS44MDA5MTA2IDc0LjAyNjcyODMsOTguMzI5MzQ2OCA3NS4wMzUzOTI1LDk5LjMyNzExNTQgQzc1LjU0NzEyNjQsOTkuODMzMTI2NSA3Ni4yNzYyMDQyLDEwMC4xMTUyODggNzcuMDAzNTk5Nyw5OS45MTM3OTAzIEM3OC43MTMwODAyLDk5LjQ0MDE3NDIgNzguMTI1MzA5Niw5OC4xNzg3MDk3IDc4LjE2NTAxMDIsOTcuMDA3NjI3NCBDNzguMzY0ODU5LDkxLjEyNDAzMjQgNzguMDk1MDI5NSw4NS45MTkxMTQ1IDc5LjQ5NDMwNzEsODAuMTA2NDY0NyBDODAuNTI3ODY4Myw3NS44MTE4NDg2IDgyLjI1MDQ3MDIsNzEuOTExNDgwNiA4NC40ODI3ODczLDY4LjA3MTM2NzUgQzg3LjMyMTM3OTUsNjMuMTg3MTYwOCA5MC4zODU3MjY4LDU4Ljg5NzcyNzkgOTQuMjg5NTA2MSw1NC43MTU1MjI2IEM5NS4yMDczMjk5LDUzLjczMjAwNzkgOTUuNDA3ODUxNSw1My4zMTUwODMyIDk2LjYzODU2OTgsNTMuMjQzODE0IEM5Ny41NzA1MjQ0LDUzLjE5MDAzODIgOTguOTMzODAyMyw1My44MjgyMjEzIDk5LjgzOTg1MDUsNTQuMDQ5MTU1OCBDMTAxLjgzNzY2NSw1NC41MzYwNTM5IDEwMy44MzkxOCw1NS4wMTc0NDQ4IDEwNS44NzMzMzEsNTUuMzQ1MjgzMSBDMTA5LjYxMzI2MSw1NS45NDgxNTU2IDExMy4zMTY1MTksNTUuOTg4NjQ5NCAxMTcuMDkwMDk0LDU1Ljg3MDQwNzQgQzEyNC41MTY0NTksNTUuNjM4MTM0NiAxMzEuOTc0Nzg3LDU1LjExNzIyMTcgMTM5LjE3NTA2MSw1My4yNDcwNTM1IEMxNDMuOTU2OTY0LDUyLjAwNTM1IDE0OC4xOTY1MTYsNDkuNzc2MjQ0MyAxNTIuNzc2ODg3LDQ4LjE0MjIzNjQgQzE1Mi44NTg2NDQsNDguMTEzMDgwOCAxNTQuMDA2NTk2LDQ3LjI5NTEwNDkgMTU0LjIwNzc5MSw0Ny4zMjg0NzE5IEMxNTQuNDg4NzIzLDQ3LjM3NDc5NjggMTU2LjE4NDc0Niw0OS4xNTQyNTg4IDE1Ni40NzEwNjEsNDkuMzc4NDMyNyBDMTU4LjY5NjY0OSw1MS4xMjM4Nzk4IDE2MS4xMzc4OTksNTEuODU2NjU2NiAxNjMuNTQxNDY3LDUzLjIwODE3OTQgQzE2Ni41MDQ4ODEsNTQuODc0NTgyNSAxNjMuNjM0OTk5LDUyLjQ4OTk4MDQgMTY1LjI2OTQ1Miw1NC41NjY4MjkyIEMxNjUuNzQ1ODU5LDU1LjE3MTY0NTQgMTY1Ljk4OTc4Miw1Ni4yOTMxNjMyIDE2Ni4zNzE5ODQsNTYuOTc4MzE5MiBDMTY3LjU4Nzg5OSw1OS4xNjEwOTk5IDE2OS4yNzk1NDgsNjEuMDc5NTM2NyAxNzEuMzAyOTMyLDYyLjYwMTc4MTYgQzE3My4yNTgwMTgsNjQuMDcyNTE4NCAxNzYuMTk2MTk4LDY0Ljc4Mjk0MjYgMTc3LjE5MzA4Nyw2Ni42OTcxNjggQzE3Ny45NjE4NjUsNjguMTc0MDU5OSAxNzguMjIwOTI5LDcwLjE4MTI1OTIgMTc4Ljg0MTMzNCw3MS43NTc5Mjc5IEMxODAuNDY4NzIyLDc1Ljg5MzE2MDIgMTgyLjYxNzkzNyw3OS43NDk0NzA5IDE4NC43NjcxNTIsODMuNjQ0MzMxNyBDMTg2LjQ5ODUwMiw4Ni43ODMwOTEzIDE4OC4zOTIzNTQsODkuNTI1MDExMSAxODguNTg0ODAxLDkzLjExMTc5NDcgQzE4OC42NTE3NTQsOTQuMzYwMzAxMiAxODcuNDYzNzY0LDEwMS44NDkzOTcgMTkwLjM1NzUzNCw5OS41NzE2OTgyIEMxOTAuNzg2NTAyLDk5LjIzNDE0MTUgMTkxLjcxMTM5MSw5NS40MTU3MzMgMTkxLjkwMTQ4Myw5NC43Njc4MzE0IEMxOTIuNjcyNjE2LDkyLjEzNTA4MyAxOTIuOTQ2ODIsODkuMzg2Njg0MSAxOTMuMjk2MDUsODYuNjgxNjk0NyBDMTkzLjk5MDQ3NCw4MS4zMDIxNjcyIDE5NC4yMTg1ODQsNzYuMTgzNzQ0MSAxOTMuNzY1MDU2LDcwLjc2NTY2NjUiIGlkPSJyZWFjdC1wYXRoLTgzMjg3NzciPjwvcGF0aD48ZmlsdGVyIHg9Ii0wLjglIiB5PSItMi4wJSIgd2lkdGg9IjEwMS41JSIgaGVpZ2h0PSIxMDguMCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9InJlYWN0LWZpbHRlci04MzI4Nzc0Ij48ZmVPZmZzZXQgZHg9IjAiIGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIj48L2ZlT2Zmc2V0PjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjE2IDAiIHR5cGU9Im1hdHJpeCIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dNYXRyaXhPdXRlcjEiPjwvZmVDb2xvck1hdHJpeD48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSI+PC9mZU1lcmdlTm9kZT48ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiPjwvZmVNZXJnZU5vZGU+PC9mZU1lcmdlPjwvZmlsdGVyPjwvZGVmcz48bWFzayBpZD0icmVhY3QtbWFzay04MzI4Nzc2IiBmaWxsPSJ3aGl0ZSI+PHVzZSB4bGluazpocmVmPSIjcmVhY3QtcGF0aC04MzI4Nzc4Ij48L3VzZT48L21hc2s+PGcgaWQ9Ik1hc2siPjwvZz48ZyBpZD0iVG9wL1Nob3J0LUhhaXIvU2hvcnQtQ3VybHkiIG1hc2s9InVybCgjcmVhY3QtbWFzay04MzI4Nzc2KSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuMDAwMDAwLCAwLjAwMDAwMCkiPjxtYXNrIGlkPSJyZWFjdC1tYXNrLTgzMjg3NzUiIGZpbGw9IndoaXRlIj48dXNlIHhsaW5rOmhyZWY9IiNyZWFjdC1wYXRoLTgzMjg3NzciPjwvdXNlPjwvbWFzaz48dXNlIGlkPSJTaG9ydC1IYWlyIiBzdHJva2U9Im5vbmUiIGZpbGw9IiMyODM1NEIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgeGxpbms6aHJlZj0iI3JlYWN0LXBhdGgtODMyODc3NyI+PC91c2U+PGcgaWQ9IlNraW4v8J+RtvCfj70tMDMtQnJvd24iIG1hc2s9InVybCgjcmVhY3QtbWFzay04MzI4Nzc1KSIgZmlsbD0iIzJDMUIxOCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDAuMDAwMDAwKSAiIGlkPSJDb2xvciI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjI2NCIgaGVpZ2h0PSIyODAiPjwvcmVjdD48L2c+PC9nPjxnIGlkPSJUb3AvX1Jlc291cmNlcy9QcmVzY3JpcHRpb24tMDIiIGZpbGw9Im5vbmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYyLjAwMDAwMCwgODUuMDAwMDAwKSIgc3Ryb2tlLXdpZHRoPSIxIj48ZGVmcz48ZmlsdGVyIHg9Ii0wLjglIiB5PSItMi40JSIgd2lkdGg9IjEwMS41JSIgaGVpZ2h0PSIxMDkuOCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9InJlYWN0LWZpbHRlci04MzI4Nzc5Ij48ZmVPZmZzZXQgZHg9IjAiIGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIj48L2ZlT2Zmc2V0PjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjIgMCIgdHlwZT0ibWF0cml4IiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSI+PC9mZUNvbG9yTWF0cml4PjxmZU1lcmdlPjxmZU1lcmdlTm9kZSBpbj0ic2hhZG93TWF0cml4T3V0ZXIxIj48L2ZlTWVyZ2VOb2RlPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyI+PC9mZU1lcmdlTm9kZT48L2ZlTWVyZ2U+PC9maWx0ZXI+PC9kZWZzPjxnIGlkPSJXYXlmYXJlcnMiIGZpbHRlcj0idXJsKCNyZWFjdC1maWx0ZXItODMyODc3OSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCA3LjAwMDAwMCkiIGZpbGw9IiMyNTJDMkYiPjxwYXRoIGQ9Ik0zNCw0MSBMMzEuMjQyMTQ5OCw0MSBDMTcuMzE0NzEyNSw0MSA5LDMzLjMzNTkyODYgOSwyMC41IEM5LDEwLjEyNyAxMC44MTcwMDU4LDAgMzIuNTI5OTMwNiwwIEwzNS40NzAwNjk0LDAgQzU3LjE4Mjk5NDIsMCA1OSwxMC4xMjcgNTksMjAuNSBDNTksMzIuNTY4NjQyOSA0OC43MjEyNzQ4LDQxIDM0LDQxIFogTTMyLjM4NTM2MDYsNiBDMTMsNiAxMywxMi44NDEwMTU5IDEzLDIxLjUwMTU0OTggQzEzLDI4LjU3MTk0MjggMTYuMTE2MjU0LDM3IDMwLjk3MDkzNjUsMzcgTDM0LDM3IEM0Ni4zNjQ5MDg1LDM3IDU1LDMwLjYyNzAzNzMgNTUsMjEuNTAxNTQ5OCBDNTUsMTIuODQxMDE1OSA1NSw2IDM1LjYxNDYzOTQsNiBMMzIuMzg1MzYwNiw2IFoiIGlkPSJMZWZ0IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD48cGF0aCBkPSJNOTYsNDEgTDkzLjI0MjE0OTgsNDEgQzc5LjMxNDcxMjUsNDEgNzEsMzMuMzM1OTI4NiA3MSwyMC41IEM3MSwxMC4xMjcgNzIuODE3MDA1OCwwIDk0LjUyOTkzMDYsMCBMOTcuNDcwMDY5NCwwIEMxMTkuMTgyOTk0LDAgMTIxLDEwLjEyNyAxMjEsMjAuNSBDMTIxLDMyLjU2ODY0MjkgMTEwLjcyMTI3NSw0MSA5Niw0MSBaIE05NC4zODUzNjA2LDYgQzc1LDYgNzUsMTIuODQxMDE1OSA3NSwyMS41MDE1NDk4IEM3NSwyOC41NzE5NDI4IDc4LjExOTQ4MzMsMzcgOTIuOTcwOTM2NSwzNyBMOTYsMzcgQzEwOC4zNjQ5MDksMzcgMTE3LDMwLjYyNzAzNzMgMTE3LDIxLjUwMTU0OTggQzExNywxMi44NDEwMTU5IDExNyw2IDk3LjYxNDYzOTQsNiBMOTQuMzg1MzYwNiw2IFoiIGlkPSJSaWdodCIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+PHBhdGggZD0iTTIuOTU0NTQ1NDUsNS43NzE1NjQzOSBDMy42NDU5MDkwOSw1LjA5NjI5MTM2IDExLjIwOTU0NTUsMCAzMi41LDAgQzUwLjM1MTM2MzYsMCA1NC4xMzAyMjczLDEuODUyNjcyMTcgNTkuODUwMjI3Myw0LjY1MTg4MDkgTDYwLjI2ODkyMzMsNC44NTg1MDg5OSBDNjAuNjY2NjAxNCw0Ljk5OTAxODk2IDYyLjcwMDI0NDcsNS42ODk4Mjk4MSA2NS4wNzkwNjA2LDUuNzY1Nzk1MTkgQzY3LjI0NjI5NDgsNS42NzI3ODU2NyA2OS4xMDAwMTk1LDUuMDg1NDAxOTEgNjkuNjQxNjk4LDQuODk3MTk3NjcgQzc2LjE3MDM5MTUsMS43MjIwODY0IDgyLjU2MTA5NzEsMCA5Ny41LDAgQzExOC43OTA0NTUsMCAxMjYuMzU0MDkxLDUuMDk2MjkxMzYgMTI3LjA0NTQ1NSw1Ljc3MTU2NDM5IEMxMjguNjc5MzE4LDUuNzcxNTY0MzkgMTMwLDcuMDYxNTA5MDQgMTMwLDguNjU3MzQ2NTkgTDEzMCwxMS41NDMxMjg4IEMxMzAsMTMuMTM4OTY2MyAxMjguNjc5MzE4LDE0LjQyODkxMSAxMjcuMDQ1NDU1LDE0LjQyODkxMSBDMTI3LjA0NTQ1NSwxNC40Mjg5MTEgMTIwLjE0Mzk5NywxNC40Mjg5MTEgMTIwLjE0Mzk5NywxNy4zMTQ2OTMyIEMxMjAuMTQzOTk3LDIwLjIwMDQ3NTQgMTE4LjE4MTgxOCwxMy4xMzg5NjYzIDExOC4xODE4MTgsMTEuNTQzMTI4OCBMMTE4LjE4MTgxOCw4LjczMjQwMjUxIEMxMTQuNTc4NTc1LDcuMzUzNDAxNTEgMTA4LjEyODQxMSw0Ljc4NjE3NTM1IDk3LjUsNC43ODYxNzUzNSBDODUuNjU4NDY1MSw0Ljc4NjE3NTM1IDc5Ljc2MTA5ODQsNi44ODYwMjgxMyA3NC43MDIyOTM1LDguOTcxMTIzNjggTDc0Ljc1ODg2MzYsOS4xMDc1Mjg2MSBMNzQuNzU2MzY2NywxMS4wOTM3NjA4IEw3Mi41MzkxNjY2LDE2LjQ0MzYzMzkgTDY5LjgwMDQ5MDgsMTUuMzYwODM1MSBDNjkuNTU1ODk2OSwxNS4yNjQxMjkyIDY5LjAyODEzOTYsMTUuMDkwMzkyIDY4LjI5NjM1MDUsMTQuOTA5OTA0NCBDNjYuMjU2MjcyLDE0LjQwNjc0MTkgNjQuMTU4OTA4NywxNC4yNTM1NjkgNjIuMzA0MDgzNiwxNC42MzQzMDg0IEM2MS42MjM1OTAzLDE0Ljc3Mzk5MzEgNjAuOTkyMjI4NiwxNC45ODM2MDg1IDYwLjQxMjgxMjcsMTUuMjY2NzMyIEw1Ny43NzA0ODI0LDE2LjU1Nzg3MDEgTDU1LjEyNjY3NTEsMTEuMzk2MjAzMSBMNTUuMjQ0MDkwOSw5LjEwMTc1NzA1IEw1NS4zMjQ4MjAzLDguOTA2ODM4NTUgQzUwLjk2MjA1MjYsNi44NzM4NjM3NCA0Ni45MzkyNjM5LDQuNzg2MTc1MzUgMzIuNSw0Ljc4NjE3NTM1IEMyMS44NzIxNDU5LDQuNzg2MTc1MzUgMTUuNDIyMTMxLDcuMzUyNDM5NyAxMS44MTgxODE4LDguNzMxNDY3MSBMMTEuODE4MTgxOCwxMS41NDMxMjg4IEMxMS44MTgxODE4LDEzLjEzODk2NjMgOC44NjM2MzYzNiwyMC4yMDA0NzU0IDguODYzNjM2MzYsMTcuMzE0NjkzMiBDOC44NjM2MzYzNiwxNC40Mjg5MTEgMi45NTQ1NDU0NSwxNC40Mjg5MTEgMi45NTQ1NDU0NSwxNC40Mjg5MTEgQzEuMzIzNjM2MzYsMTQuNDI4OTExIDAsMTMuMTM4OTY2MyAwLDExLjU0MzEyODggTDAsOC42NTczNDY1OSBDMCw3LjA2MTUwOTA0IDEuMzIzNjM2MzYsNS43NzE1NjQzOSAyLjk1NDU0NTQ1LDUuNzcxNTY0MzkgWiIgaWQ9IlN0dWZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD48L2c+PC9nPjwvZz48L2c+PC9nPjwvZz48L2c+PC9nPjwvZz48L3N2Zz4="
            ></v-img>
          </v-list-item-avatar>
          <div class="ml-1 subtitle-2">
            {{ name }}
          </div>
        </div>
      </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <h3>{{ name }}</h3>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text color="primary" @click="dialog=true">编辑信息</v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text color="primary" @click="changepass=true">修改密码</v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text color="primary" @click="signout">退 出</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
      <v-spacer />
      <v-menu
          open-on-hover
          offset-y
          :value="hover"
          min-width="300"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-badge
              bordered
              transition="slide-x-transition"
              color="error"
              :value="logfail"
              :content="logfail"
              offset-x="25"
              offset-y="25"
          >
            <v-btn icon v-bind="attrs" v-on="on" v-if="id==='1'">
              <v-icon>mdi-bell-outline</v-icon>
            </v-btn>
          </v-badge>
        </template>
        <v-list  rounded >
          <v-list-item v-if="logcount===0">
            <v-spacer/>
            <v-list-item-content>
              <v-list-item-title >暂无通知</v-list-item-title>
            </v-list-item-content>
            <v-spacer/>
          </v-list-item>
          <v-list-item v-else v-for="item in log" :key="item.log_id" @click="unreadmail(item)" two-line>
            <v-list-item-content>
              <v-list-item-title >{{ item.log_title }}</v-list-item-title>
              <v-list-item-subtitle>{{item.log_time}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-spacer/>
            <v-icon v-if="item.log_status===0">{{unreadmailicon}}</v-icon>
            <v-icon v-else>{{readmailicon}}</v-icon>
          </v-list-item>
        </v-list>
      </v-menu>

<!--  修改信息框    -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">用户信息</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="mess.real"
                        label="姓名*"
                        required
                      :disabled="read"
                        :error-messages="realErrors"
                        @input="$v.mess.real.$touch()"
                        @blur="$v.mess.real.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                        label="住址*"
                        v-model="mess.addr"
                        required
                        :disabled="read"
                        :error-messages="addrErrors"
                        @input="$v.mess.addr.$touch()"
                        @blur="$v.mess.addr.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        label="手机号码*"
                        v-model="mess.phone"
                        required
                        :disabled="read"
                        counter="11"
                        :error-messages="phoneErrors"
                        @input="$v.mess.phone.$touch()"
                        @blur="$v.mess.phone.$touch()"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>带*为必填项</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="edit">{{ read? "修 改":"保 存" }}</v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false ;read=true">关 闭</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

<!--  修改信息提示框    -->
      <v-snackbar
          top
          v-model="show"
          :timeout="3000"
      >
        {{ savemess }}
        <template v-slot:action="{ attrs }">
          <v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="show = false"
          >
            关 闭
          </v-btn>
        </template>
      </v-snackbar>
      <!--查看通知-->
      <v-snackbar
          top
          v-model="showlog"
      >
        {{ logmess }}
        <template v-slot:action="{ attrs }">
          <v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="showlog = false"
          >
            关 闭
          </v-btn>
        </template>
      </v-snackbar>
<!--  修改密码框    -->
    </v-app-bar>
    <v-main><router-view /></v-main>
      </v-responsive>
      <v-dialog v-model="changepass" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">修改密码</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    v-model="pass.oldPass"
                    label="旧密码*"
                    required
                    @click:append="show3 = !show3"
                    :error-messages="opErrors"
                    @input="$v.pass.oldPass.$touch()"
                    @blur="$v.pass.oldPass.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show4 ? 'text' : 'password'"
                    label="新密码*"
                    v-model="pass.newPass"
                    required
                    @click:append="show4 = !show4"
                    :error-messages="npErrors"
                    @input="$v.pass.newPass.$touch()"
                    @blur="$v.pass.newPass.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show4 ? 'text' : 'password'"
                    label="确认新密码*"
                    v-model="pass.confirmPass"
                    required
                    @click:append="show4 = !show4"
                    :error-messages="cpErrors"
                    @input="$v.pass.confirmPass.$touch()"
                    @blur="$v.pass.confirmPass.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>带*为必填项</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="change_Pass">保 存</v-btn>
          <v-btn color="blue darken-1" text @click="close">关 闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-card>

  </div>

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required,maxLength,minLength,numeric} from 'vuelidate/lib/validators'
import {
  mdiAccountCircle,
  mdiPost,
  mdiHammerScrewdriver,
  mdiAccountTie,
  mdiEmailMarkAsUnread,
  mdiEmailOpen,
  mdiHammer
} from '@mdi/js'
export default {
  data (){
    return{
      mdiHammer:mdiHammer,
      screenHeight: document.body.clientHeight, // 屏幕尺寸
      mdiAccountTie:mdiAccountTie,
      mdiAccountCircle:mdiAccountCircle,
      mdiHammerScrewdriver:mdiHammerScrewdriver,
      mdiPost:mdiPost,
      url: process.env.VUE_APP_API,
      showlog:false,logmess:"",
      unreadmailicon:mdiEmailMarkAsUnread,readmailicon:mdiEmailOpen,
      hover:false,
      logcount:0,logsucc:0,logfail:0,log:[],
      id:window.localStorage.getItem('identity'),
      savemess:null, show:false, show2:false,read:true, dialog:false,
      changePassMess:null,changepass:false,show3:false,show4:false,
      name: window.localStorage.getItem('name'),
      drawerDisplay: null,
      mess:{real:"", phone:"", addr:"", passwd:"",login:window.localStorage.getItem('loginname')},
      pass:{oldPass:"",confirmPass:"",newPass:"",login:window.localStorage.getItem('loginname')},
    }
  },

  mixins: [validationMixin],
  validations: {
    mess: {
      phone:{required,minLength:minLength(11),maxLength:maxLength(11),numeric},
      addr:{required,},
      real:{required,},
    },
    pass:{
      oldPass: {required,minLength:minLength(8)},
      newPass: {required,minLength:minLength(8)},
      confirmPass: {required,minLength:minLength(8)},
    }
  },
  computed: {
    phoneErrors() {
      const errors = []
      if (!this.$v.mess.phone.$dirty) return errors
      !this.$v.mess.phone.maxLength && errors.push('请输入11位格式手机号')
      !this.$v.mess.phone.minLength && errors.push('请输入11位格式手机号')
      !this.$v.mess.phone.numeric && errors.push('手机号仅支持数字输入')
      !this.$v.mess.phone.required && errors.push('手机号不可为空')
      return errors
    },
    addrErrors(){
      const errors = []
      if (!this.$v.mess.addr.$dirty) return errors
      !this.$v.mess.addr.required && errors.push('地址不可为空')
      return errors
    },
    realErrors(){
      const errors = []
      if (!this.$v.mess.real.$dirty) return errors
      !this.$v.mess.real.required && errors.push('姓名不可为空')
      return errors
    },
    opErrors(){
      const errors = []
      if (!this.$v.pass.oldPass.$dirty) return errors
      !this.$v.pass.oldPass.minLength && errors.push('密码至少8位字符')
      !this.$v.pass.oldPass.required && errors.push('密码不可为空')
      return errors
    },
    npErrors(){
      const errors = []
      if (!this.$v.pass.newPass.$dirty) return errors
      !this.$v.pass.newPass.minLength && errors.push('密码至少8位字符')
      !this.$v.pass.newPass.required && errors.push('密码不可为空')
      return errors
    },
    cpErrors(){
      const errors = []
      if (!this.$v.pass.confirmPass.$dirty) return errors
      !this.$v.pass.confirmPass.minLength && errors.push('密码至少8位字符')
      !this.$v.pass.confirmPass.required && errors.push('密码不可为空')
      return errors
    },
    },

  mounted() {
    this.drawerDisplay = this.$vuetify.breakpoint.lgAndDown ? false : true;
    this.query();
  },

  methods:{
    unreadmail(itemm){
      if(itemm.log_status===0){
        var mess = {"id":itemm.log_id}
        this.axios.post(this.url+'cust/readmail', JSON.stringify(mess))
        this.query()
      }
      this.logmess=itemm.log_log;
      this.showlog=true
    },
    close () {
      this.pass.oldPass="";
      this.pass.confirmPass="";
      this.pass.newPass="";
      this.changepass = false
      this.$v.$reset()
    },
    signout:function (){
      window.localStorage.setItem('login','0')
      this.$router.push({ path:'/',});
    },
    query:function (){
      this.axios.post(this.url+'user/queryusermess', JSON.stringify({"name":window.localStorage.getItem('loginname')}),
      ).then(res => {//true
        this.mess.real=res.data["real"];this.mess.phone=res.data["phone"];this.mess.addr=res.data["addr"];this.mess.passwd=res.data["passwd"];
      }, res => {// 错误回调
        /*TODO 这里写啥？*/
        console.log(res);
      })
      this.axios.post(this.url+'user/querylog', JSON.stringify({"name":window.localStorage.getItem('loginname')}),
      ).then(res => {//true
        this.log = res.data[0]
        this.logcount = res.data[1]+res.data[2]
        this.logfail=res.data[1]
        this.logsucc = res.data[2]
      }, res => {// 错误回调
        /*TODO 这里写啥？*/
        console.log(res);
      })
    },
    edit:function (){
      /*处于只读状态*/
        if (this.read) {
          this.read = !this.read;
      }/*处于修改状态*/
        else{
          if(this.$v.mess.$invalid||this.$v.mess.$error){
            this.$v.mess.$touch()
          }
          else {
            this.axios.post(this.url+'user/saveusermess', JSON.stringify(this.mess)).then(res => {//true
              this.savemess = res.data["mess"];
              this.show = true;
              this.query();
              this.read = !this.read;
            }, res => {// 错误回调
              /*TODO 这里写啥？*/
              console.log(res);
            })

          }
        }
    },
    change_Pass:function (){
      if(this.$v.$invalid||this.$v.$error){
        this.$v.$touch()
      }
      else {
        this.axios.post(this.url+'user/changeuserpass', JSON.stringify(this.pass),
        ).then(res => {//true
          this.savemess = res.data["mess"];
          this.show=true;
          this.query();
          this.pass.oldPass="";
          this.pass.confirmPass="";
          this.pass.newPass="";
          if(this.savemess === "修改成功"){
            this.close()
          }
        })
      }
    },
  },
};
</script>
