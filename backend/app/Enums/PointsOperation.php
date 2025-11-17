<?php

namespace App\Enums;

enum PointsOperation: string {
    case PURCHASE = 'purchase';

    case REDEEM = 'redeem';

    case PURCHASE_ANNULATION = 'purchase_annulation';

    case REDEEM_ANNULATION = 'redeem_annulation';
}
