// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import keyring from '@polkadot/ui-keyring';
import toShortAddress from './toShortAddress';

export default function getAddrName (address: string, withShort?: boolean, defaultName?: string): string | undefined {
  let pair;

  try {
    pair = keyring.getAccount(address).isValid()
      ? keyring.getAccount(address)
      : keyring.getAddress(address);
  } catch (error) {
    // all-ok, we have empty fallbacks
  }

  const name = pair && pair.isValid()
    ? pair.getMeta().name
    : defaultName;

  return !name && withShort
    ? toShortAddress(address)
    : name;
}
