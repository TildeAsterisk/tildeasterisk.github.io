---
tags:
  - Physicanim
---
 In this tutorial you will learn how to create and animate active ragdolls in the Unity game engine using the Physicanim asset package.

## Installing the Physicanim package from git

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjkl-Ddj8zs7GpV0X_UjuijT6V6uqAM0lMaxC3vnGBHRSTkERfaPgfOLv8jDYuhmrAv365unnNtQ5O6bhsEZX6UFV5d0Iof_PHxtj1LklXejVNW2QzfHpD1rKr0Di-UNTurXVqqFhPsoVURSiTL2IGCvuS5_MhPvjUkIJNaLZmdQlZslWMol-_wtw5SlA/s320/632dde1d-3251-47e2-9dc7-ad6eb6fc3e60_image5.png)](https://www.blogger.com/u/1/blog/post/edit/5175033775044694573/1733388939332829682?hl=en-GB#)

  

  

a[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjwcJL-7sb1n-EpjVQ_i-h3OgUCnaf1S1kbybVG8cf09LVVAIaYhLjnjEBTxWxto0FvbOz7GLbrvB0MH3peFyUi7ZUHeLf_wJGtHdBgNhDKAp3Ux0tnSTmB1e3WMU88nUB2EnhuDhMiHBRT_yrdXateZMydQYqeojX2GVWID4FM0wNfj7CUTp0n5MCDOQ/s1600/Screenshot%202022-10-25%20001827.jpg)](https://www.blogger.com/u/1/blog/post/edit/5175033775044694573/1733388939332829682?hl=en-GB#)

https://github.com/TildeAsterisk/Physicanim.git

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiz7MxvHmxzCejMSYJdUcIa4Xao7QhhrkVVzIPmG2_4TKKI5i6KxYBAQ_EU9j2UnooXjVrj0vA_J7HJ69MzS9SqK0yoO3jG5d-hP1Yzm1YpS81RMqeeKA6FSbzijnHklBiZU8Typz07YMYTLfPAar-HHB3O3YJVhzOMkWyCnWnod5J-lcnEm5d4KXecoA/s320/Screenshot%202022-10-25%20001952.jpg)](https://www.blogger.com/u/1/blog/post/edit/5175033775044694573/1733388939332829682?hl=en-GB#)

  

Install GIT if necessary.  
[Git - Downloads (git-scm.com)](https://www.blogger.com/u/1/blog/post/edit/5175033775044694573/1733388939332829682?hl=en-GB#)

### Create a Physicanim Character

In order to create your active ragdoll you will start with a normal character model playing a regular animation. Make sure your character is rigged as a humanoid.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFTGOo6qLiEM-QW_bktTDyJc7WBq6rS_VENQMUbT96CETum1zIW2LTXJDOVZx19mEtTv5NxN-YtgAjAeoPgs55SDDAvyhkspy80huAwCqPJXGDuyYJdhn6afFnprUC69o1GQV0GGGmIdT_BOzF4ib8exbntg7XsmhbAAJE34blDeq_FjBp_5P-6cNg3Q/s320/Screenshot%202022-10-25%20003216.jpg)](https://www.blogger.com/u/1/blog/post/edit/5175033775044694573/1733388939332829682?hl=en-GB#)

- Import you character into the scene.
- Drag and drop your chosen animation onto your character.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi11IZ-oSdydSThkWWWZxGAIwcmNDDIFTxD4F7LZwds38oN063vCQfOkq5W9C7V_IhOztFodosVuHmxfPKfmV2SbVCBlJdjIraz5M19JU37UHXvR2as1xFXQtL6PniQZKFtVKnlfA8Q2NR_0-vp78KyHvJ8ew4iEIykDRmCcUmUNcqlQrnLtLB5Gw0PfA/s320/Screenshot%202022-10-25%20002228.jpg)](https://www.blogger.com/u/1/blog/post/edit/5175033775044694573/1733388939332829682?hl=en-GB#)

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZuievucbnCnXVRxA_lAvY5xpv-Sp1N4A5BMiplHAgDpaX8i3jtgc6iiGFMhE2JFjIXVoKw3idceaHHpgMJv3s-F2zaV1CLVCNvHIEwGqg_NOtDA2tXyQ0yEvZcY96D3hsW7BKv8NxK8aAAVATQxONnz6Qei53tfedeNKd140BaaLZxtatpPdqf3B13A/s320/Screenshot%202022-10-25%20002348.jpg)](https://www.blogger.com/u/1/blog/post/edit/5175033775044694573/1733388939332829682?hl=en-GB#)

  

  

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhBeYY-k_C9SanqWSyJcoz-NVc6QDPB0SfGk_LhAJtEqbhM70bNgkB_f0upk3NwBgC6LkByMLx8B287B7riQbG0sBD9skxAZDgA8ePHAuTy6dVi5o1jFKhP2a_SuN02sPZVPCbe_vYHWHowca_-AJJg5S1VPbscQMao0bPjeDFrRMEmg_Rkdn4MqeY1WQ/s320/Screenshot%202022-10-25%20002631.jpg)](https://www.blogger.com/u/1/blog/post/edit/5175033775044694573/1733388939332829682?hl=en-GB#)

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizxw2KmZlHywWdGHeFfPUU02DiKN2V7T71h5e3EE4A63G__DQo32TBecz7k2bO7I_lcmCjNOlMxcZDQWSRb-vlMyOpjsXYBD2cA4LC-WE1UWVZu56mweDFTnl6Ym9UEomhRcVkuOaodcL9TbAnbdqqQP7JFhQT2C7nKGY08ptcXNFirg7Ney-FRk6IZg/s1600/Screenshot%202022-10-25%20002649.jpg)](https://www.blogger.com/u/1/blog/post/edit/5175033775044694573/1733388939332829682?hl=en-GB#)