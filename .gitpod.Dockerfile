FROM alpine:3.10

ENV TZ=Europe/Moscow
# http://bugs.python.org/issue19846
# > At the moment, setting "LANG=C" on a Linux system *fundamentally breaks Python 3*, and that's not OK.
ENV LANG C.UTF-8
# This hack is widely applied to avoid python printing issues in docker containers.
# See: https://github.com/Docker-Hub-frolvlad/docker-alpine-python3/pull/13
ENV PYTHONUNBUFFERED=1
# User
ARG GNAME=gitpod
ARG UNAME=gitpod
ARG GID=1000
ARG UID=1000
ARG REQUIREMENTS=requirements.txt

ENV APK_PARAMS --no-cache --progress
ENV PIP_PARAMS --no-cache-dir --disable-pip-version-check

# install ca-certificates so that HTTPS works consistently
# other runtime dependencies for Python are installed later
RUN apk add --update ${APK_PARAMS} \
    shadow sudo git curl wget bash \
    build-base go bash-completion \
    nodejs npm yarn

RUN echo "**** Add user ${UNAME} ****" && \
    addgroup -S -g ${GID} ${GNAME} && \
    adduser -S -u $UID -G ${GNAME} -s /bin/bash ${UNAME} && \
    echo 'root:root' | chpasswd && \
    echo "${UNAME} ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/${UNAME} && \
    chmod 0440 /etc/sudoers.d/${UNAME} && \
    addgroup ${UNAME} root && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# RUN apk add ${APK_PARAMS} python3 && \
#     if [ ! -e /usr/bin/python ]; then ln -sf python3 /usr/bin/python ; fi && \
#     python --version && \
#     \
#     python3 -m ensurepip && \
#     rm -r /usr/lib/python*/ensurepip && \
#     pip3 install --no-cache --upgrade pip setuptools wheel virtualenv && \
#     if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
#     pip --version

# COPY docker/system_files /

# WORKDIR /u01
# COPY /server/requirements*.txt /tmp/

# RUN \
#     apk add ${APK_PARAMS} --virtual .pip-deps \
#         # common
#         gcc musl-dev python3-dev \
#         # db, crypt
#         postgresql-dev openssl-dev \
#         # xml
#         libffi-dev libxml2-dev libxslt-dev \
#         # pillow
#         zlib-dev jpeg-dev && \
#     virtualenv venv && \
#     # pylint ipython
#     venv/bin/pip ${PIP_PARAMS} install -r /tmp/${REQUIREMENTS} && \
#     venv/bin/pip ${PIP_PARAMS} install ipython "prompt-toolkit>=2.0" && \
#     apk --purge del .pip-deps

# COPY docker/*.sh /tmp/
# RUN chmod +x /tmp/entrypoint.sh
# ENTRYPOINT ["/tmp/entrypoint.sh"]

# sbt.server/,sbt.ui/
# -v /path/to/sbt.server:/u01/sbt.server
# -v /path/to/sbt.ui:/u01/sbt.ui
# -v /path/to/data:/u01/data
# for ssh connect
# -v /home/$USER/.ssh/id_sber:/root/.ssh/id_rsa
# RUN chmod 777 /tmp
# RUN chown -R ${UNAME}:${GNAME} /u01
# RUN chown -R ${UNAME}:${GNAME} /home/${UNAME}
# WORKDIR /u01
USER ${UNAME}
# CMD ["/bin/bash"]
