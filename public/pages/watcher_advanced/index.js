import { uiModules } from 'ui/modules';
import { Notifier } from 'ui/notify';
import { SentinlError } from '../../services';
import routes from 'ui/routes';

import template from './watcher_advanced.html';
import controller from './watcher_advanced';

routes
  .when('/watcher/raw/:id/edit')
  .when('/watcher/raw/:type/new')
  .defaults(/watcher\/raw\/(:id\/edit|:type\/new)/, {
    template,
    controller,
    controllerAs: 'watcherAdvanced',
    bindToController: true,
    resolve: {
      watcher: function ($route, kbnUrl, sentinlConfig, watcherService) {
        const notify = new Notifier({ location: 'Watcher' });

        const watcherId = $route.current.params.id;

        if (!watcherId) {
          return watcherService.new('advanced').catch(function (err) {
            notify.error(new SentinlError('create adv watcher', err));
            kbnUrl.redirect('/');
          });
        }

        return watcherService.get(watcherId).catch(function (err) {
          notify.error(new SentinlError('get adv watcher', err));
          kbnUrl.redirect('/');
        });
      },
    },
  });
