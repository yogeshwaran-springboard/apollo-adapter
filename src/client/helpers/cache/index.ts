import { Cache } from "@apollo/client";
import {
  EvictCacheOptions,
  IdentifyCacheOptions,
  ModifyCacheOptions,
  ReadCacheOptions,
  ReadFragmentOptions,
  WriteCacheOptions,
  WriteFragmentOptions,
} from "../../types";
import { getClient } from "../index";

export const readCache = (options: ReadCacheOptions) => {
  try {
    const { domain } = options;
    const { sharedCache } = getClient(domain);
    // read data from cache
    const response = sharedCache.readQuery({ ...options });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const writeCache = (options: WriteCacheOptions) => {
  try {
    const { domain } = options;
    const { sharedCache } = getClient(domain);
    //   write the cache with  data
    sharedCache.writeQuery({ ...options });
  } catch (e) {
    console.error(e);
  }
};
export const evictCache = (options: EvictCacheOptions) => {
  try {
    const { domain } = options;
    const { sharedCache } = getClient(domain);
    sharedCache.evict({ ...options });
  } catch (e) {
    console.error(e);
  }
};
export const identifyCache = (options: IdentifyCacheOptions) => {
  try {
    const { domain } = options;
    const { sharedCache } = getClient(domain);
    return sharedCache.identify({ ...options });
  } catch (e) {
    console.error(e);
  }
};

export const writeFragment = (options: WriteFragmentOptions) => {
  try {
    const { domain } = options;

    const { sharedCache } = getClient(domain);
    //   write the cache with  data
    const response = sharedCache.writeFragment({ ...options });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const readFragment = (options: ReadFragmentOptions) => {
  try {
    const { domain } = options;

    const { sharedCache } = getClient(domain);
    //   read the cache with  data
    const response = sharedCache.readFragment({ ...options });
    return response;
  } catch (e) {
    console.error(e);
  }
};
export const modifyCache = (options: ModifyCacheOptions) => {
  try {
    const { domain } = options;
    const { sharedCache } = getClient(domain);
    //   update the cache with new data
    sharedCache.modify({ ...options });
  } catch (e) {
    console.error(e);
  }
};
