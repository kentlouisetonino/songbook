import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { useEffect } from 'react';
import { CookiesStorage, PageRoute } from 'src/helpers/enums';

interface Props {
  router: NextRouter;
}

export default function useLoginChecker({ router }: Props) {
  useEffect(() => {
    if (Cookies.get(CookiesStorage.AccessToken)) {
      router.push(PageRoute.Root);
    }
  }, [router.isReady]);
}
