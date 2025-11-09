package com.cloudplayground.model.enums;

/**
 * Theme activation status
 */
public enum ThemeStatus {
    /**
     * Theme is not activated
     */
    NOT_ACTIVATED,

    /**
     * Theme is being activated (K8s resources are being created)
     */
    ACTIVATING,

    /**
     * Theme is running and ready to use
     */
    RUNNING,

    /**
     * Theme is being stopped (K8s resources are being deleted)
     */
    STOPPING,

    /**
     * Theme has been stopped
     */
    STOPPED,

    /**
     * Theme activation/deactivation failed
     */
    ERROR
}
